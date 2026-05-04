import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import produkData from "../../data/produk.json";

/* Format harga ke Rupiah */
function formatRupiah(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

/* Badge kategori */
function CategoryBadge({ category }) {
  const styles = {
    Elektronik: "bg-blue-100 text-blue-600",
    Aksesoris:  "bg-purple-100 text-purple-600",
  };
  return (
    <span className={`px-3 py-1 text-xs rounded-full font-medium ${styles[category] ?? "bg-gray-100 text-gray-600"}`}>
      {category}
    </span>
  );
}

/* Badge stok */
function StockBadge({ stock }) {
  if (stock === 0) return <span className="px-3 py-1 text-xs rounded-full font-medium bg-red-100 text-red-600">Habis</span>;
  if (stock <= 5) return <span className="px-3 py-1 text-xs rounded-full font-medium bg-yellow-100 text-yellow-600">Menipis ({stock})</span>;
  return <span className="px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-600">{stock}</span>;
}

export default function Produk() {
  const [produk, setProduk] = useState(produkData);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");

  const [form, setForm] = useState({
    title: "",
    code: "",
    category: "Elektronik",
    brand: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduk = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };
    setProduk([newProduk, ...produk]);
    setForm({ title: "", code: "", category: "Elektronik", brand: "", price: "", stock: "" });
    setShowForm(false);
  };

  /* Filter + Search */
  const filtered = produk.filter((p) => {
    const matchCategory = filterCategory === "Semua" || p.category === filterCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  const categories = ["Semua", ...new Set(produkData.map((p) => p.category))];

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <PageHeader title="Produk" breadcrumb={["Dashboard", "Produk"]}>
        <button
          onClick={() => setShowForm(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          + Add Produk
        </button>
      </PageHeader>

      <div className="p-5">
        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk, kode, atau brand..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-hijau bg-white"
            />
          </div>

          {/* Filter kategori */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  filterCategory === cat
                    ? "bg-hijau text-white"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-hijau hover:text-hijau"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Daftar Produk</h2>
              <p className="text-sm text-gray-400">
                Menampilkan {filtered.length} dari {produk.length} produk
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-400 border-b bg-gray-50">
                  <th className="p-3">#</th>
                  <th className="p-3">Nama Produk</th>
                  <th className="p-3">Kode</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Harga</th>
                  <th className="p-3">Stok</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl">📦</span>
                        <p>Tidak ada produk yang ditemukan</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, i) => (
                    <tr key={item.code + i} className="border-b hover:bg-gray-50 transition">
                      <td className="p-3 text-gray-400">{i + 1}</td>
                      <td className="px-6 py-4">
                        <Link to={`/products/${i + 1}`} className="text-emerald-400 hover:text-emerald-500">
                          {item.title}
                        </Link>
                      </td>
                      <td className="p-3 font-semibold text-hijau">{item.code}</td>
                      <td className="p-3">
                        <CategoryBadge category={item.category} />
                      </td>
                      <td className="p-3 text-gray-500">{item.brand}</td>
                      <td className="p-3 font-semibold">{formatRupiah(item.price)}</td>
                      <td className="p-3">
                        <StockBadge stock={item.stock} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Form Add Produk */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-700 mb-6">Tambah Produk Baru</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nama Produk</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama produk"
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                />
              </div>

              {/* Code */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Kode Produk</label>
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: P031"
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Kategori</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                >
                  <option value="Elektronik">Elektronik</option>
                  <option value="Aksesoris">Aksesoris</option>
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama brand"
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Contoh: 500000"
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-hijau text-sm"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Stok</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Contoh: 10"
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
