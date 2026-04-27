import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import customersData from "../../data/customers.json";

/* Badge warna berdasarkan loyalty */
function LoyaltyBadge({ loyalty }) {
  const styles = {
    Gold:   "bg-yellow-100 text-yellow-600",
    Silver: "bg-gray-100 text-gray-600",
    Bronze: "bg-orange-100 text-orange-600",
  };
  return (
    <span className={`px-3 py-1 text-xs rounded-full font-medium ${styles[loyalty] ?? "bg-gray-100 text-gray-500"}`}>
      {loyalty}
    </span>
  );
}

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [showForm, setShowForm] = useState(false);

  /* State form tambah customer */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    loyalty: "Bronze",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: `CUST-${String(customers.length + 1).padStart(3, "0")}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      loyalty: form.loyalty,
    };
    setCustomers([newCustomer, ...customers]);
    setForm({ name: "", email: "", phone: "", loyalty: "Bronze" });
    setShowForm(false);
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* PageHeader dengan props */}
      <PageHeader
        title="Customers"
        breadcrumb={["Dashboard", "Customers"]}
      >
        <button
          onClick={() => setShowForm(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          + Add Customer
        </button>
      </PageHeader>

      {/* TABEL CUSTOMERS */}
      <div className="p-5">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Customer List</h2>
              <p className="text-sm text-gray-400">Total {customers.length} customers</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-400 border-b bg-gray-50">
                  <th className="p-3">Customer ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Loyalty</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {customers.map((cust) => (
                  <tr key={cust.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3 font-semibold text-hijau">{cust.id}</td>
                    <td className="p-3">{cust.name}</td>
                    <td className="p-3">{cust.email}</td>
                    <td className="p-3">{cust.phone}</td>
                    <td className="p-3">
                      <LoyaltyBadge loyalty={cust.loyalty} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL FORM ADD CUSTOMER */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-700 mb-6">Add New Customer</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama customer"
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="contoh@email.com"
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="08xxxxxxxxxx"
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                />
              </div>

              {/* Loyalty */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Loyalty
                </label>
                <select
                  name="loyalty"
                  value={form.loyalty}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                >
                  <option value="Bronze">Bronze</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                </select>
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
