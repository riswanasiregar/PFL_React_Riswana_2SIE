import { Routes, Route } from "react-router-dom";

import MainLayout from "./pertemuan6/layouts/MainLayout";

import Dashboard from "./pertemuan6/pages/Dashboard";
import Orders from "./pertemuan6/pages/Orders";
import Customers from "./pertemuan6/pages/Customers";
import NotFound from "./pertemuan6/pages/NotFound";

function App() {
  return (
    <Routes>
      {/* halaman pakai layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
      </Route>

      {/* halaman error tanpa layout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
