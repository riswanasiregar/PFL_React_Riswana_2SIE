export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-5xl font-bold text-red-500">404</h1>

      <p className="text-gray-600 mt-3">Halaman tidak ditemukan</p>

      <a href="/" className="mt-5 bg-hijau text-white px-5 py-2 rounded-lg">
        Kembali ke Dashboard
      </a>
    </div>
  );
}
