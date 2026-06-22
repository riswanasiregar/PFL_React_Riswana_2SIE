import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { MdDashboard, MdShoppingCart, MdLogout } from "react-icons/md";

export default function MemberLayout() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-hijau text-white"
        : "text-gray-600 hover:bg-green-100 hover:text-hijau"
    }`;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-poppins text-2xl font-bold text-gray-800">
            Sedap<span className="text-hijau">.</span>
          </span>
          <span className="text-xs text-gray-400 ml-2">Member Portal</span>
        </div>

        <div className="flex items-center space-x-3">
          <NavLink to="/member" end className={linkClass}>
            <MdDashboard className="text-lg" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/member/checkout" className={linkClass}>
            <MdShoppingCart className="text-lg" />
            <span>Shop</span>
          </NavLink>
          <NavLink to="/member/orders" className={linkClass}>
            <MdShoppingCart className="text-lg" />
            <span>My Orders</span>
          </NavLink>

          <div className="border-l border-gray-300 h-6 mx-2" />

          <span className="text-sm text-gray-600">
            Hello, <b>{profile?.full_name || "Member"}</b>
            {profile?.tier && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
                {profile.tier}
              </span>
            )}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
          >
            <MdLogout className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
