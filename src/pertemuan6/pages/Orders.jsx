import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import PageHeaderOrders from "../components/PageHeaderOrders";

export default function Orders() {
  return (
    <div id="dashboard-container" className="flex-1 bg-gray-50 min-h-screen">
      <PageHeaderOrders />

      {/* GRID STAT CARDS */}
      <div
        id="dashboard-grid"
        className="p-5 grid sm:grid-cols-2 md:grid-cols-5 gap-4"
      >
        {/* TOTAL ORDERS */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-green-500 rounded-full p-4">
            <FaShoppingCart className="text-3xl text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-2xl font-bold">75</span>
            <span className="text-gray-400">Total Orders</span>
          </div>
        </div>

        {/* TOTAL DELIVERED */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-blue-500 rounded-full p-4">
            <FaTruck className="text-3xl text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-2xl font-bold">175</span>
            <span className="text-gray-400">Total Delivered</span>
          </div>
        </div>

        {/* TOTAL CANCELED */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-red-500 rounded-full p-4">
            <FaBan className="text-3xl text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-2xl font-bold">40</span>
            <span className="text-gray-400">Total Canceled</span>
          </div>
        </div>

        {/* TOTAL REVENUE */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-yellow-500 rounded-full p-4">
            <FaDollarSign className="text-3xl text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-2xl font-bold">Rp.128</span>
            <span className="text-gray-400">Total Revenue</span>
          </div>
        </div>

        {/* TOTAL CUSTOMERS */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-purple-500 rounded-full p-4">
            <FaUsers className="text-3xl text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-2xl font-bold">90</span>
            <span className="text-gray-400">Total Customers</span>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div id="recent-orders-container" className="p-5">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Recent Orders
              </h2>

              <p className="text-sm text-gray-400">
                Latest customer transactions
              </p>
            </div>

            <button className="text-sm px-4 py-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-400 border-b">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Amount</th>
                </tr>
              </thead>

              <tbody className="text-gray-600">
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src="/img/memo_18.png"
                      className="w-9 h-9 rounded-full border"
                    />
                    Andi
                  </td>

                  <td className="p-3 font-semibold">#001</td>
                  <td className="p-3">12 Apr 2026</td>

                  <td className="p-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                      Delivered
                    </span>
                  </td>

                  <td className="p-3 font-semibold text-green-600">
                    Rp.50.000
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src="/img/memo_18.png"
                      className="w-9 h-9 rounded-full border"
                    />
                    Siti
                  </td>

                  <td className="p-3 font-semibold">#002</td>
                  <td className="p-3">13 Apr 2026</td>

                  <td className="p-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">
                      Pending
                    </span>
                  </td>

                  <td className="p-3 font-semibold text-yellow-600">
                    Rp.75.000
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src="/img/memo_18.png"
                      className="w-9 h-9 rounded-full border"
                    />
                    Budi
                  </td>

                  <td className="p-3 font-semibold">#003</td>
                  <td className="p-3">14 Apr 2026</td>

                  <td className="p-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
                      Canceled
                    </span>
                  </td>

                  <td className="p-3 font-semibold text-red-500">Rp.40.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
