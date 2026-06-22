import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { fetchCustomers, deleteCustomer } from "@/services/supabaseAPI";

/* Badge warna berdasarkan tier */
function LoyaltyBadge({ loyalty }) {
  const styles = {
    Gold:     "bg-yellow-100 text-yellow-600",
    Silver:   "bg-gray-100 text-gray-600",
    Bronze:   "bg-orange-100 text-orange-600",
    Platinum: "bg-purple-100 text-purple-600",
  };
  return (
    <span className={`px-3 py-1 text-xs rounded-full font-medium ${styles[loyalty] ?? "bg-gray-100 text-gray-500"}`}>
      {loyalty}
    </span>
  );
}

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Load customers error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (userId) => {
    if (!confirm("Yakin ingin menghapus customer ini?")) return;
    try {
      await deleteCustomer(userId);
      loadData();
    } catch (err) {
      console.error("Delete customer error:", err);
    }
  };

  if (loading) return <div className="p-4 text-center text-gray-400">Loading...</div>;

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <PageHeader
        title="Customers"
        breadcrumb={["Dashboard", "Customers"]}
      >
        <span className="text-sm text-gray-400">Managed via Supabase Auth</span>
      </PageHeader>

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
                  <th className="p-3">User ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Tier</th>
                  <th className="p-3">Points</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {customers.map((cust) => (
                  <tr key={cust.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3 font-semibold text-hijau">{cust.id.slice(0, 8)}...</td>
                    <td className="p-3">{cust.full_name || "N/A"}</td>
                    <td className="p-3">{cust.role}</td>
                    <td className="p-3">
                      <LoyaltyBadge loyalty={cust.tier} />
                    </td>
                    <td className="p-3">{cust.points}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(cust.id)}
                        className="text-red-400 hover:text-red-600 text-sm"
                      >
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
