export default function ServiceTable({ services }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      {/* TITLE */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Daftar Layanan Kesehatan
        </h2>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* HEADER */}
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Kategori</th>
              <th className="px-4 py-3 text-left">Kota</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Harga</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-t hover:bg-emerald-50 transition"
              >
                {/* ID */}
                <td className="px-4 py-3 font-medium text-gray-700">
                  {service.id}
                </td>

                {/* NAME */}
                <td className="px-4 py-3 font-semibold text-gray-800">
                  {service.name}
                </td>

                {/* CATEGORY */}
                <td className="px-4 py-3">
                  <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded-md text-xs font-medium">
                    {service.category}
                  </span>
                </td>

                {/* CITY */}
                <td className="px-4 py-3 text-gray-500">
                  📍 {service.contact.city}
                </td>

                {/* RATING */}
                <td className="px-4 py-3 text-amber-500 font-medium">
                  ⭐ {service.rating}
                </td>

                {/* PRICE */}
                <td className="px-4 py-3 font-semibold text-gray-800">
                  Rp {service.price.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
