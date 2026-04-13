export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span
          id="logo-title"
          className="font-poppins text-[48px] text-gray-900"
        >
          Sedap{" "}
          <b id="logo-dot" className="text-hijau">
            .
          </b>
        </span>

        <span id="logo-subtitle" className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          <li>
            <div
              id="menu-1"
              className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
            >
              Dashboard
            </div>
          </li>

          <li>
            <div
              id="menu-2"
              className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
            >
              Orders
            </div>
          </li>

          <li>
            <div
              id="menu-3"
              className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
            >
              Customers
            </div>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center"
        >
          <div id="footer-text" className="text-white text-sm">
            <span>Please organize your menus through button below!</span>

            <div
              id="add-menu-button"
              className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2"
            >
              <span className="text-gray-600 flex items-center">Add Menus</span>
            </div>
          </div>

          <img
            id="footer-avatar"
            className="w-20 rounded-full"
            src="https://avatar.iran.liara.run/public/28"
          />
        </div>

        <span id="footer-brand">Sedap Restaurant Admin Dashboard</span>

        <p id="footer-copyright">&copy; 2025 All Right Reserved</p>
      </div>
    </div>
  );
}
