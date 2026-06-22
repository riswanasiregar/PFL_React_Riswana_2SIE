import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { fetchMyOrders } from "@/services/supabaseAPI";

function formatRupiah(amount) {
  return "Rp " + Number(amount).toLocaleString("id-ID");
}

function StatusBadge({ status }) {
  const styles = {
    completed:  "bg-green-100 text-green-600",
    pending:    "bg-yellow-100 text-yellow-600",
    processing: "bg-blue-100 text-blue-600",
    cancelled:  "bg-red-100 text-red-600",
  };
  return (
    <span className={`px-3 py-1 text-xs rounded-full font-medium ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

export default function MemberOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const data = await fetchMyOrders(user.id);
        setOrders(data);
      } catch (err) {
        setError(err.message || "Gagal memuat pesanan");
      } finally {
        setLoading(false);
      }
    }
    if (user?.id) loadOrders();
  }, [user]);

  if (loading) return <div className="p-4 text-center text-gray-400">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">My Orders</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Order History</h2>
            <p className="text-sm text-gray-400">Total {orders.length} orders</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-400 border-b bg-gray-50">
                <th className="p-3">Order ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Original</th>
                <th className="p-3">After Discount</th>
                <th className="p-3">Points Earned</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">📦</span>
                      <p>Belum ada pesanan</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3 font-semibold text-hijau">{order.id.slice(0, 8)}...</td>
                    <td className="p-3">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                    <td className="p-3">{formatRupiah(order.total_original)}</td>
                    <td className="p-3 font-semibold">{formatRupiah(order.total_discounted)}</td>
                    <td className="p-3">+{order.points_earned}</td>
                    <td className="p-3">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
