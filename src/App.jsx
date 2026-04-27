import { Routes, Route } from "react-router-dom";
import MainLayout from "./pertemuan6-latihan/layouts/MainLayout";
import AuthLayout from "./pertemuan6-latihan/layouts/AuthLayout"; 
import Dashboard from "./pertemuan6-latihan/pages/Dashboard";
import Orders from "./pertemuan6-latihan/pages/Orders";
import Customers from "./pertemuan6-latihan/pages/Customers";
import Error400 from "./pertemuan6-latihan/pages/Error400";
import Error401 from "./pertemuan6-latihan/pages/Error401";
import Error403 from "./pertemuan6-latihan/pages/Error403";
import NotFound from "./pertemuan6-latihan/pages/NotFound";

// PERBAIKAN DI SINI: Nama import harus unik dan sesuai dengan komponennya
import Forgot from "./pertemuan6-latihan/pages/auth/Forgot";
import Login from "./pertemuan6-latihan/pages/auth/Login";
import Register from "./pertemuan6-latihan/pages/auth/Register";

export default function App() {
  return (

    <Routes>
      {/* Layout untuk halaman utama */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/error-400" element={<Error400 />} />
        <Route path="/error-401" element={<Error401 />} />
        <Route path="/error-403" element={<Error403 />} />
      </Route>

      {/* Layout untuk halaman login/register */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
      </Route>

      {/* Halaman 404 jika route tidak ditemukan */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}