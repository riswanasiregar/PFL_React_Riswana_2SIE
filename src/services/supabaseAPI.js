import { supabase } from "@/lib/supabase";

/* ── Products ── */
export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

/* ── Orders (Admin: all, Member: own) ── */
export async function fetchOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*, user_profiles(full_name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchMyOrders(userId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(name))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createOrder(orderData, items) {
  /* 1. Insert order */
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert(orderData)
    .select()
    .single();
  if (orderError) throw orderError;

  /* 2. Insert order_items */
  const itemsWithOrderId = items.map((item) => ({
    ...item,
    order_id: order.id,
  }));
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsWithOrderId);
  if (itemsError) throw itemsError;

  return order;
}

export async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteOrder(orderId) {
  const { error } = await supabase.from("orders").delete().eq("id", orderId);
  if (error) throw error;
}

/* ── Profiles / Customers (Admin) ── */
export async function fetchCustomers() {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function deleteCustomer(userId) {
  const { error } = await supabase.from("user_profiles").delete().eq("id", userId);
  if (error) throw error;
}

/* ── Points & Tier ── */
export async function updateProfilePoints(userId, newPoints, newTier) {
  const { data, error } = await supabase
    .from("user_profiles")
    .update({ points: newPoints, tier: newTier, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* ── Tier helper (client-side calculation) ── */
export function calculateTier(points) {
  if (points > 1000) return "Platinum";
  if (points >= 501) return "Gold";
  if (points >= 101) return "Silver";
  return "Bronze";
}

export function getDiscountRate(tier) {
  const rates = { Bronze: 0.05, Silver: 0.1, Gold: 0.15, Platinum: 0.2 };
  return rates[tier] ?? 0.05;
}
