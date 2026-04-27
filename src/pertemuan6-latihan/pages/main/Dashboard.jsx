import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import ordersData from "../../data/orders.json";
import customersData from "../../data/customers.json";

/* Format harga ke Rupiah */
function formatRupiah(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

/* Badge status */
function StatusBadge({ status }) {
  const styles = {
    Completed: "bg-green-100 text-green-600",
    Pending:   "bg-yellow-100 text-yellow-600",
    Cancelled: "bg-red-100 text-red-600",
  };
  return (
    <span className={`px-3 py-1 text-xs rounded-full font-medium ${styles[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

export default function Dashboard() {
  /* Hitung stat dari data JSON */
  const totalOrders    = ordersData.length;
  const totalDelivered = ordersData.filter((o) => o.status === "Completed").length;
  const totalCancelled = ordersData.filter((o) => o.status === "Cancelled").length;
  const totalRevenue   = ordersData
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + o.totalPrice, 0);
  const totalCustomers = customersData.length;

  /* 5 order terbaru */
  const recentOrders = [...ordersData].reverse().slice(0, 5);

  return (
    <div id="dashboard-container" className="flex-1 bg-gray-50 min-h-screen">
      <PageHeader title="Dashboard" breadcrumb={["Dashboard", "Overview"]}>
        <button className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
          Refresh
        </button>
      </PageHeader>

      {/* STAT CARDS */}
      <div className="p-5 grid sm:grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Orders */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-green-500 rounded-full p-4">
            <FaShoppingCart className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{totalOrders}</span>
            <span className="text-gray-400">Total Orders</span>
          </div>
        </div>

        {/* Total Delivered */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-blue-500 rounded-full p-4">
            <FaTruck className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{totalDelivered}</span>
            <span className="text-gray-400">Total Delivered</span>
          </div>
        </div>

        {/* Total Cancelled */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-red-500 rounded-full p-4">
            <FaBan className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{totalCancelled}</span>
            <span className="text-gray-400">Total Canceled</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-yellow-500 rounded-full p-4">
            <FaDollarSign className="text-3xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{formatRupiah(totalRevenue)}</span>
            <span className="text-gray-400">Total Revenue</span>
          </div>
        </div>

        {/* Total Customers */}
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
              href="/pertemuan6-latihan.html/orders"
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
                    <td className="p-3 font-semibold text-hijau">{order.id}</td>
                    <td className="p-3">{order.customerName}</td>
                    <td className="p-3">{order.orderDate}</td>
                    <td className="p-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="p-3 font-semibold">{formatRupiah(order.totalPrice)}</td>
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
