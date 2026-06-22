import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { fetchOrders, updateOrderStatus, deleteOrder } from "@/services/supabaseAPI";

function StatusBadge({ status }) {
  const styles = {
    completed: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
    cancelled: "bg-red-100 text-red-600",
    processing: "bg-blue-100 text-blue-600",
  };
  return (
    <span className={`px-3 py-1 text-xs rounded-full font-medium ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

function formatRupiah(amount) {
  return "Rp " + Number(amount).toLocaleString("id-ID");
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      console.error("Load orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadData();
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  const handleDelete = async (orderId) => {
    if (!confirm("Yakin ingin menghapus order ini?")) return;
    try {
      await deleteOrder(orderId);
      loadData();
    } catch (err) {
      console.error("Delete order error:", err);
    }
  };

  if (loading) return <div className="p-4 text-center text-gray-400">Loading...</div>;

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Orders"]}>
        <button onClick={loadData} className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
          Refresh
        </button>
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Order List</h2>
              <p className="text-sm text-gray-400">Total {orders.length} orders</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-400 border-b bg-gray-50">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Order Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Total Price</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3 font-semibold text-hijau">{order.id.slice(0, 8)}...</td>
                    <td className="p-3">{order.user_profiles?.full_name || "N/A"}</td>
                    <td className="p-3">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="border border-gray-200 rounded-lg p-1 text-sm outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3 font-semibold">{formatRupiah(order.total_discounted || order.total_original)}</td>
                    <td className="p-3">
                      <button onClick={() => handleDelete(order.id)} className="text-red-400 hover:text-red-600 text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
