import { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import { fetchOrders, fetchCustomers } from "@/services/supabaseAPI";

/* Format harga ke Rupiah */
function formatRupiah(amount) {
  return "Rp " + Number(amount).toLocaleString("id-ID");
}

/* Badge status */
function StatusBadge({ status }) {
  const styles = {
    completed:  "bg-green-100 text-green-600",
    pending:    "bg-yellow-100 text-yellow-600",
    cancelled:  "bg-red-100 text-red-600",
    processing: "bg-blue-100 text-blue-600",
  };
  return (
    <span className={`px-3 py-1 text-xs rounded-full font-medium ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [ordersData, customersData] = await Promise.all([
          fetchOrders(),
          fetchCustomers(),
        ]);
        setOrders(ordersData);
        setCustomers(customersData);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  /* Hitung stat dari data */
  const totalOrders    = orders.length;
  const totalDelivered = orders.filter((o) => o.status === "completed").length;
  const totalCancelled = orders.filter((o) => o.status === "cancelled").length;
  const totalRevenue   = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + Number(o.total_discounted || o.total_original || 0), 0);
  const totalCustomers = customers.length;

  /* 5 order terbaru */
  const recentOrders = orders.slice(0, 5);

  if (loading) return <div className="p-4 text-center text-gray-400">Loading...</div>;

  return (
    <div id="dashboard-container" className="flex-1 bg-gray-50 min-h-screen">
      <PageHeader title="Dashboard" breadcrumb={["Dashboard", "Overview"]}>
        <button className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
          Refresh
        </button>
      </PageHeader>

      {/* STAT CARDS */}
      <div className="p-5 grid sm:grid-cols-2 md:grid-cols-5 gap-4">
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-green-500 rounded-full p-4">
            <FaShoppingCart className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{totalOrders}</span>
            <span className="text-gray-400">Total Orders</span>
          </div>
        </div>

        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-blue-500 rounded-full p-4">
            <FaTruck className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{totalDelivered}</span>
            <span className="text-gray-400">Total Delivered</span>
          </div>
        </div>

        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-red-500 rounded-full p-4">
            <FaBan className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{totalCancelled}</span>
            <span className="text-gray-400">Total Canceled</span>
          </div>
        </div>

        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-yellow-500 rounded-full p-4">
            <FaDollarSign className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{formatRupiah(totalRevenue)}</span>
            <span className="text-gray-400">Total Revenue</span>
          </div>
        </div>

        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-purple-500 rounded-full p-4">
            <FaUsers className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{totalCustomers}</span>
            <span className="text-gray-400">Total Customers</span>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="p-5">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Recent Orders</h2>
              <p className="text-sm text-gray-400">5 transaksi terbaru</p>
            </div>
            <a
              href="/orders"
              className="text-sm px-4 py-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition"
            >
              View All
            </a>
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
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3 font-semibold text-hijau">{order.id.slice(0, 8)}...</td>
                    <td className="p-3">{order.user_profiles?.full_name || "N/A"}</td>
                    <td className="p-3">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                    <td className="p-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="p-3 font-semibold">{formatRupiah(order.total_discounted || order.total_original)}</td>
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
