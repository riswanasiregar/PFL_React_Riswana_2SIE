import { useNavigate } from "react-router-dom";

export default function ErrorPage({ code, title, description, image, bgColor, codeColor, btnColor }) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#a8e6cf" }}
    >
      {/* Dekorasi kotak hijau tua — pojok kiri bawah */}
      <div
        className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-3xl"
        style={{ backgroundColor: "#2ecc71" }}
      />
      {/* Dekorasi kotak hijau tua — pojok kanan atas */}
      <div
        className="absolute top-0 right-0 w-28 h-28 rounded-bl-3xl"
        style={{ backgroundColor: "#27ae60" }}
      />
      {/* Dekorasi lingkaran kecil putih */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full opacity-70" />
      <div className="absolute bottom-20 right-20 w-4 h-4 bg-white rounded-full opacity-70" />
      <div className="absolute top-1/2 left-8 w-3 h-3 bg-white rounded-full opacity-60" />
      <div className="absolute top-1/3 right-12 w-3 h-3 bg-white rounded-full opacity-60" />

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col items-center text-center z-10 w-[600px] py-16 px-20">

        {/* Kode Error */}
        <h1
          className="text-9xl font-extrabold mb-6"
          style={{ color: codeColor ?? "#f59e0b" }}
        >
          {code}
        </h1>

        {/* Gambar dalam lingkaran */}
        <div
          className="w-72 h-72 rounded-full flex items-center justify-center mb-8 overflow-hidden"
          style={{ backgroundColor: bgColor ?? "#e0f2fe" }}
        >
          <img
            src={image}
            alt={`Error ${code}`}
            className="w-60 h-60 object-contain"
          />
        </div>

        {/* Opps! */}
        <p className="text-gray-700 font-semibold text-3xl mb-3">Opps!</p>

        {/* Judul */}
        <p className="text-gray-800 font-bold text-lg mb-2">{title}</p>

        {/* Deskripsi */}
        <p className="text-gray-500 text-base mb-10">{description}</p>

        {/* Tombol */}
        <button
          onClick={() => navigate("/")}
          className="text-white text-base font-semibold px-10 py-3.5 rounded-full transition hover:opacity-90"
          style={{ backgroundColor: btnColor ?? "#f59e0b" }}
        >
          Kembali Ke Dashboard
        </button>
      </div>
    </div>
  );
}
