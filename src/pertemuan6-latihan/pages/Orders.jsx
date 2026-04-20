import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ordersData from "../data/orders.json";

/* Badge warna berdasarkan status */
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

/* Format harga ke Rupiah */
function formatRupiah(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [showForm, setShowForm] = useState(false);

  /* State form tambah order */
  const [form, setForm] = useState({
    customerName: "",
    status: "Pending",
    totalPrice: "",
    orderDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      customerName: form.customerName,
      status: form.status,
      totalPrice: Number(form.totalPrice),
      orderDate: form.orderDate,
    };
    setOrders([newOrder, ...orders]);
    setForm({ customerName: "", status: "Pending", totalPrice: "", orderDate: "" });
    setShowForm(false);
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* PageHeader dengan props */}
      <PageHeader
        title="Orders"
        breadcrumb={["Dashboard", "Orders"]}
      >
        <button
          onClick={() => setShowForm(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          + Add Orders
        </button>
      </PageHeader>

      {/* TABEL ORDERS */}
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
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {orders.map((order) => (
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

      {/* MODAL FORM ADD ORDER */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-700 mb-6">Add New Order</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama customer"
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Total Price */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Total Price (Rp)
                </label>
                <input
                  type="number"
                  name="totalPrice"
                  value={form.totalPrice}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Contoh: 150000"
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                />
              </div>

              {/* Order Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Order Date
                </label>
                <input
                  type="date"
                  name="orderDate"
                  value={form.orderDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                />
              </div>

              {/* Tombol */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-hijau text-white py-2.5 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
