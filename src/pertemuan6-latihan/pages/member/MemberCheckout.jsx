import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchProducts,
  createOrder,
  updateProfilePoints,
  calculateTier,
  getDiscountRate,
} from "@/services/supabaseAPI";

function formatRupiah(amount) {
  return "Rp " + Number(amount).toLocaleString("id-ID");
}

export default function MemberCheckout() {
  const { user, profile } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Gagal memuat produk");
      }
    }
    loadProducts();
  }, []);

  /* Add to cart */
  const addToCart = (product) => {
    if (product.stock <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product_id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          name: product.name,
          price: Number(product.price),
          quantity: 1,
        },
      ];
    });
  };

  /* Remove from cart */
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product_id !== productId));
  };

  /* Update quantity */
  const updateQty = (productId, qty) => {
    if (qty <= 0) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  /* Calculate totals */
  const tier = profile?.tier || "Bronze";
  const discountRate = getDiscountRate(tier);
  const totalOriginal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscounted = Math.round(totalOriginal * (1 - discountRate));
  const pointsEarned = Math.floor(totalDiscounted / 10000);

  /* Checkout */
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const orderData = {
        user_id: user.id,
        total_original: totalOriginal,
        total_discounted: totalDiscounted,
        points_earned: pointsEarned,
        status: "pending",
      };

      const items = cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      await createOrder(orderData, items);

      /* Update profile points & tier */
      const newPoints = (profile.points || 0) + pointsEarned;
      const newTier = calculateTier(newPoints);
      await updateProfilePoints(user.id, newPoints, newTier);

      setSuccess(`Pesanan berhasil dibuat! Anda mendapat +${pointsEarned} poin.`);
      setCart([]);
    } catch (err) {
      setError(err.message || "Checkout gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Shop</h1>

      {error && (
        <div className="bg-red-200 mb-5 p-4 text-sm text-gray-600 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-200 mb-5 p-4 text-sm text-gray-600 rounded-lg">
          {success}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Product Catalog */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Product Catalog</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-xl p-4 flex flex-col"
                >
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-hijau font-bold">
                      {formatRupiah(product.price)}
                    </span>
                    <span className="text-xs text-gray-400">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0}
                    className={`mt-3 w-full py-2 rounded-lg text-sm font-medium transition ${
                      product.stock <= 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-hijau text-white hover:bg-green-600"
                    }`}
                  >
                    {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Cart ({cart.length} items)
            </h2>

            {cart.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                Cart is empty
              </p>
            ) : (
              <>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatRupiah(item.price)} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQty(item.product_id, item.quantity - 1)
                          }
                          className="w-6 h-6 bg-gray-100 rounded text-sm"
                        >
                          -
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQty(item.product_id, item.quantity + 1)
                          }
                          className="w-6 h-6 bg-gray-100 rounded text-sm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="text-red-400 hover:text-red-600 text-sm ml-1"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatRupiah(totalOriginal)}</span>
                  </div>
                  <div className="flex justify-between text-hijau font-medium">
                    <span>Discount ({tier} {discountRate * 100}%)</span>
                    <span>-{formatRupiah(totalOriginal - totalDiscounted)}</span>
                  </div>
                  <div className="flex justify-between text-gray-800 font-bold text-base border-t pt-2">
                    <span>Total</span>
                    <span>{formatRupiah(totalDiscounted)}</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    You will earn <b>+{pointsEarned}</b> points
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading || cart.length === 0}
                  className={`mt-4 w-full py-3 rounded-xl text-white font-semibold transition ${
                    loading
                      ? "bg-gray-400"
                      : "bg-hijau hover:bg-green-600"
                  }`}
                >
                  {loading ? "Processing..." : "Checkout"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
