-- ============================================================
-- SUPABASE SCHEMA DDL
-- Project: E-Commerce Admin & Member Portal
-- ============================================================

-- ============================================================
-- CLEANUP: Drop existing objects (safe to re-run)
-- CASCADE automatically drops dependent policies, triggers, etc.
-- ============================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();
DROP FUNCTION IF EXISTS update_member_tier(UUID);
DROP FUNCTION IF EXISTS calculate_tier(INTEGER);
DROP FUNCTION IF EXISTS is_admin() CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- ============================================================
-- 1. TABLE: user_profiles
-- ============================================================
CREATE TABLE user_profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  role        TEXT NOT NULL DEFAULT 'member'
                CHECK (role IN ('admin', 'member')),
  points      INTEGER NOT NULL DEFAULT 0,
  tier        TEXT NOT NULL DEFAULT 'Bronze'
                CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 2. HELPER FUNCTION: Check if current user is admin
--    (Must be created AFTER user_profiles table exists)
-- ============================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
$$;

-- ============================================================
-- 3. RLS POLICIES: user_profiles
-- ============================================================

-- RLS: All authenticated users can read profiles
CREATE POLICY "user_profiles_select_authenticated"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (true);

-- RLS: Users can update their own profile (only full_name)
CREATE POLICY "user_profiles_update_own"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- RLS: Users can insert their own profile (fallback if trigger didn't fire)
CREATE POLICY "user_profiles_insert_own"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- RLS: Admin can do anything on user_profiles
CREATE POLICY "user_profiles_all_admin"
  ON user_profiles FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- 4. TABLE: products
-- ============================================================
CREATE TABLE products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT,
  price       NUMERIC NOT NULL,
  stock       INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- RLS: Everyone (authenticated & anon) can read products
CREATE POLICY "products_select_all"
  ON products FOR SELECT
  TO authenticated, anon
  USING (true);

-- RLS: Admin can INSERT products
CREATE POLICY "products_insert_admin"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- RLS: Admin can UPDATE products
CREATE POLICY "products_update_admin"
  ON products FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- RLS: Admin can DELETE products
CREATE POLICY "products_delete_admin"
  ON products FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================
-- 5. TABLE: orders
-- ============================================================
CREATE TABLE orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES user_profiles(id),
  total_original    NUMERIC NOT NULL,
  total_discounted  NUMERIC NOT NULL,
  points_earned     INTEGER NOT NULL DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  created_at        TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS: Members can read their own orders
CREATE POLICY "orders_select_own"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR is_admin());

-- RLS: Members can insert their own orders
CREATE POLICY "orders_insert_own"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS: Admin can update all orders (e.g. change status)
CREATE POLICY "orders_update_admin"
  ON orders FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- RLS: Admin can delete orders
CREATE POLICY "orders_delete_admin"
  ON orders FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================
-- 6. TABLE: order_items
-- ============================================================
CREATE TABLE order_items (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id          UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id        UUID NOT NULL REFERENCES products(id),
  quantity          INTEGER NOT NULL,
  price_at_purchase NUMERIC NOT NULL
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS: User can see items if the parent order belongs to them (or they are admin)
CREATE POLICY "order_items_select_own"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
        AND (orders.user_id = auth.uid() OR is_admin())
    )
  );

-- RLS: User can insert items if the parent order belongs to them
CREATE POLICY "order_items_insert_own"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
        AND orders.user_id = auth.uid()
    )
  );

-- RLS: Admin full access on order_items
CREATE POLICY "order_items_all_admin"
  ON order_items FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- 7. TRIGGER: Auto-create profile on user signup
--    Reads 'role' from user metadata (defaults to 'member')
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_role TEXT;
BEGIN
  -- Read role from metadata, default to 'member', validate allowed values
  v_role := COALESCE(NEW.raw_user_meta_data ->> 'role', 'member');
  IF v_role NOT IN ('admin', 'member') THEN
    v_role := 'member';
  END IF;

  INSERT INTO user_profiles (id, full_name, role, points, tier)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    v_role,
    0,
    'Bronze'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- 8. FUNCTION: Recalculate tier from points
-- ============================================================
CREATE OR REPLACE FUNCTION calculate_tier(p_points INTEGER)
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE
    WHEN p_points > 1000 THEN 'Platinum'
    WHEN p_points >= 501  THEN 'Gold'
    WHEN p_points >= 101  THEN 'Silver'
    ELSE 'Bronze'
  END;
$$;

-- ============================================================
-- 9. FUNCTION: Update member tier based on current points
-- ============================================================
CREATE OR REPLACE FUNCTION update_member_tier(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_points INTEGER;
  v_tier   TEXT;
BEGIN
  SELECT points INTO v_points FROM user_profiles WHERE id = p_user_id;
  v_tier := calculate_tier(v_points);
  UPDATE user_profiles SET tier = v_tier, updated_at = now() WHERE id = p_user_id;
END;
$$;

-- ============================================================
-- 10. SEED DATA: Sample products (optional, safe to re-run)
-- ============================================================
INSERT INTO products (name, description, price, stock)
SELECT * FROM (VALUES
  ('Nasi Goreng Spesial', 'Nasi goreng dengan telur, ayam, dan udang', 25000, 50),
  ('Mie Ayam Bakso', 'Mie ayam dengan bakso sapi dan pangsit goreng', 20000, 30),
  ('Ayam Geprek', 'Ayam geprek sambal bawang dengan nasi putih', 22000, 40),
  ('Sate Ayam', 'Sate ayam 10 tusuk dengan bumbu kacang dan lontong', 30000, 25),
  ('Gado-Gado', 'Gado-gado segar dengan bumbu kacang', 18000, 35),
  ('Es Teh Manis', 'Es teh manis segar', 5000, 100),
  ('Jus Alpukat', 'Jus alpukat dengan susu coklat', 15000, 25),
  ('Es Jeruk', 'Es jeruk peras segar', 8000, 80)
) AS v(name, description, price, stock)
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);
