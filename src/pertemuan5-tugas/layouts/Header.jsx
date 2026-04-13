import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { useState } from "react";

export default function Header() {
  /* STATE MODAL SEARCH */
  const [showModal, setShowModal] = useState(false);

  /* STATE DROPDOWN SETTINGS */
  const [showSetting, setShowSetting] = useState(false);

  return (
    <>
      {/* HEADER CONTAINER */}
      <div
        id="header-container"
        className="flex justify-between items-center p-4"
      >
        {/* SEARCH BAR */}
        <div id="search-bar" className="relative w-full max-w-lg">
          <input
            id="search-input"
            type="text"
            placeholder="Search Here..."
            onClick={() => setShowModal(true)}
            className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none"
          />

          <FaSearch
            id="search-icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300"
          />
        </div>

        {/* ICON CONTAINER */}
        <div id="icons-container" className="flex items-center space-x-4">
          {/* NOTIFICATION ICON */}
          <div
            id="notification-icon"
            className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer"
          >
            <FaBell />

            <span
              id="notification-badge"
              className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs"
            >
              50
            </span>
          </div>

          {/* CHART ICON */}
          <div
            id="chart-icon"
            className="p-3 bg-blue-100 rounded-2xl cursor-pointer text-xl"
          >
            <FcAreaChart />
          </div>

          {/* SETTINGS ICON */}
          <div
            id="settings-icon"
            onClick={() => setShowSetting(!showSetting)}
            className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer"
          >
            <SlSettings />
          </div>

          {/* DROPDOWN SETTINGS */}
          {showSetting && (
            <div className="absolute right-10 top-20 bg-white shadow-lg rounded-md p-3 text-sm">
              <p className="cursor-pointer hover:text-blue-500">Profile</p>

              <p className="cursor-pointer hover:text-blue-500">Settings</p>

              <p className="cursor-pointer hover:text-red-500">Logout</p>
            </div>
          )}

          {/* PROFILE */}
          <div
            id="profile-container"
            className="flex items-center space-x-4 border-l pl-4 border-gray-300"
          >
            <span id="profile-text" className="text-sm">
              Hello,
              <b className="text-gray-900">Riswana Siregar</b>
            </span>

            <img
              id="profile-avatar"
              src="/img/memo_18.png"
              className="w-10 h-10 rounded-full"
              alt="Profile"
            />
          </div>
        </div>
      </div>

      {/* MODAL SEARCH */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-2">Search Feature</h2>

            <p className="text-gray-500 mb-4">
              Fitur pencarian sedang dikembangkan
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
