import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/main/Dashboard";
import Orders from "./pages/main/Orders";
import Customers from "./pages/main/Customers";
import Produk from "./pages/main/Produk";
import Error400 from "./pages/main/Error400";
import Error401 from "./pages/main/Error401";
import Error403 from "./pages/main/Error403";
import NotFound from "./pages/main/NotFound";

const ProductDetail = lazy(() => import("./pages/main/ProdukDetail"));

export default function App() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-gray-400">Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/error-400" element={<Error400 />} />
          <Route path="/error-401" element={<Error401 />} />
          <Route path="/error-403" element={<Error403 />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
