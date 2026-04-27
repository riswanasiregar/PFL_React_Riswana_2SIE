import React, { useState } from "react"; // Tambahkan React
import { useNavigate } from "react-router-dom"; // WAJIB: Tambahkan ini
import axios from "axios"; // WAJIB: Tambahkan ini
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(""); // Gunakan string kosong untuk mereset error

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email, // Catatan: API dummyjson memang butuh field 'username'
        password: dataForm.password,
      })
      .then((response) => {
        // Jika sukses (status 200)
        navigate("/");
      })
      .catch((err) => {
        // Menangani error dari Axios
        if (err.response) {
          setError(err.response.data.message || "An error occurred");
        } else {
          setError(err.message || "An unknown error occurred");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /* error & loading status */
  const errorInfo = error ? (
    <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
      <ImSpinner2 className="me-2 animate-spin" />
      Mohon Tunggu...
    </div>
  ) : null;

  return (
    <div className="max-w-md mx-auto mt-10"> {/* Tambahan sedikit styling agar ke tengah */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Welcome Back 👋
      </h2>

      {errorInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email/Username
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="emilys"
            name="email"
            onChange={handleChange}
            required // Tambahkan required agar user tidak kirim input kosong
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
            placeholder="********"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading} // Tombol mati saat loading agar tidak double klik
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold py-2 px-4 rounded-lg transition duration-300`}
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
    </div>
  );
}