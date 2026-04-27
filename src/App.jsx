import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Loading = () => <div className="p-5 text-center">Loading...</div>;

const MainLayout = lazy(() => import("./pertemuan6-latihan/layouts/MainLayout"));
const AuthLayout = lazy(() => import("./pertemuan6-latihan/layouts/AuthLayout"));

const Dashboard = lazy(() => import("./pertemuan6-latihan/pages/main/Dashboard"));
const Orders    = lazy(() => import("./pertemuan6-latihan/pages/main/Orders"));
const Customers = lazy(() => import("./pertemuan6-latihan/pages/main/Customers"));
const Error400  = lazy(() => import("./pertemuan6-latihan/pages/main/Error400"));
const Error401  = lazy(() => import("./pertemuan6-latihan/pages/main/Error401"));
const Error403  = lazy(() => import("./pertemuan6-latihan/pages/main/Error403"));
const NotFound  = lazy(() => import("./pertemuan6-latihan/pages/main/NotFound"));

const Forgot   = lazy(() => import("./pertemuan6-latihan/pages/auth/Forgot"));
const Login    = lazy(() => import("./pertemuan6-latihan/pages/auth/Login"));
const Register = lazy(() => import("./pertemuan6-latihan/pages/auth/Register"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Grup Route dengan Layout Utama */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/error-400" element={<Error400 />} />
          <Route path="/error-401" element={<Error401 />} />
          <Route path="/error-403" element={<Error403 />} />
        </Route>

        {/* Grup Route dengan Layout Auth (Login/Register) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Catch-all Route untuk 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}