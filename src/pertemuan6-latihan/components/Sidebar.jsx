import {
  MdDashboard,
  MdAssignment,
  MdPeople,
  MdAdd,
  MdErrorOutline,
  MdLockOutline,
  MdBlock,
  MdInventory2,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2
    ${
      isActive
        ? "text-hijau bg-green-200 font-extrabold"
        : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span className="font-poppins text-[48px] text-gray-900">
          Sedap <b className="text-hijau">.</b>
        </span>
        <span className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* Menu Utama */}
      <div className="mt-10">
        <p className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">
          Main Menu
        </p>
        <ul className="space-y-3">
          {/* Dashboard */}
          <li>
            <NavLink to="/" end className={menuClass}>
              <MdDashboard className="mr-4 text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Orders */}
          <li>
            <NavLink to="/orders" className={menuClass}>
              <MdAssignment className="mr-4 text-xl" />
              <span>Orders</span>
            </NavLink>
          </li>

          {/* Customers */}
          <li>
            <NavLink to="/customers" className={menuClass}>
              <MdPeople className="mr-4 text-xl" />
              <span>Customers</span>
            </NavLink>
          </li>

          {/* Produk */}
          <li>
            <NavLink to="/produk" className={menuClass}>
              <MdInventory2 className="mr-4 text-xl" />
              <span>Produk</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Menu Error Pages */}
      <div className="mt-8">
        <p className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">
          Error Pages
        </p>
        <ul className="space-y-3">
          {/* Error 400 */}
          <li>
            <NavLink to="/error-400" className={menuClass}>
              <MdErrorOutline className="mr-4 text-xl" />
              <span>Error 400</span>
            </NavLink>
          </li>

          {/* Error 401 */}
          <li>
            <NavLink to="/error-401" className={menuClass}>
              <MdLockOutline className="mr-4 text-xl" />
              <span>Error 401</span>
            </NavLink>
          </li>

          {/* Error 403 */}
          <li>
            <NavLink to="/error-403" className={menuClass}>
              <MdBlock className="mr-4 text-xl" />
              <span>Error 403</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <div className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center">
          <div className="text-white text-sm">
            <span>Please organize your menus through button below!</span>
            <div className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2 cursor-pointer">
              <span className="text-gray-600 flex items-center font-bold">
                <MdAdd className="mr-2 text-xl" />
                Add Menus
              </span>
            </div>
          </div>
          <img
            src="/img/memo_31.png"
            className="w-20 rounded-full ml-4"
            alt="User Avatar"
          />
        </div>

        <span className="font-bold text-gray-400 block">
          Sedap Restaurant Admin Dashboard
        </span>
        <p className="font-light text-gray-400">© 2025 All Right Reserved</p>
      </div>
    </div>
  );
}
