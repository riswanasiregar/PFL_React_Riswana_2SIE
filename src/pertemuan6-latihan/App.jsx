import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

/* Contexts */
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./contexts/RequireAuth";
import RequireAdmin from "./contexts/RequireAdmin";

/* Layouts */
import MainLayout from "./layouts/MainLayout";
import MemberLayout from "./layouts/MemberLayout";
import AuthLayout from "./layouts/AuthLayout";

/* Admin Pages */
import Dashboard from "./pages/main/Dashboard";
import Orders from "./pages/main/Orders";
import Customers from "./pages/main/Customers";
import Produk from "./pages/main/Produk";
import Error400 from "./pages/main/Error400";
import Error401 from "./pages/main/Error401";
import Error403 from "./pages/main/Error403";
import NotFound from "./pages/main/NotFound";
import Components from "./pages/main/Components";
import FiturXyz from "./pages/main/Fiturxyz";
import Note from "./pages/main/Note";

/* Auth Pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";

/* Member Pages */
import MemberDashboard from "./pages/member/MemberDashboard";
import MemberOrders from "./pages/member/MemberOrders";
import MemberCheckout from "./pages/member/MemberCheckout";

/* Lazy loaded */
const ProductDetail = lazy(() => import("./pages/main/ProdukDetail"));

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="p-4 text-center text-gray-400">Loading...</div>}>
        <Routes>
          {/* ── Public Auth Routes ── */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* ── Admin Routes (Require Auth + Admin Role) ── */}
          <Route
            element={
              <RequireAuth>
                <RequireAdmin>
                  <MainLayout />
                </RequireAdmin>
              </RequireAuth>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/components" element={<Components />} />
            <Route path="/produk" element={<Produk />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/error-400" element={<Error400 />} />
            <Route path="/error-401" element={<Error401 />} />
            <Route path="/error-403" element={<Error403 />} />
            <Route path="/fiturxyz" element={<FiturXyz />} />
            <Route path="/note" element={<Note />} />
          </Route>

          {/* ── Member Routes (Require Auth) ── */}
          <Route
            element={
              <RequireAuth>
                <MemberLayout />
              </RequireAuth>
            }
          >
            <Route path="/member" element={<MemberDashboard />} />
            <Route path="/member/orders" element={<MemberOrders />} />
            <Route path="/member/checkout" element={<MemberCheckout />} />
          </Route>

          {/* ── Catch-all ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
