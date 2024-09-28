import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { logOut } from "../AuthProvider";
import {
  FiHome,
  FiBell,
  FiBarChart2,
  FiLayers,
  FiLogOut,
} from "react-icons/fi"; // Icons for sidebar

const Navigation = ({ activeComponent, setActiveComponent }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Extract first name from displayName
  const getFirstName = (fullName) => {
    return fullName?.split(" ")[0];
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="w-1/4 bg-[#1E2C68] text-white flex flex-col justify-between p-6">
        {/* Sidebar Menu Items */}
        <div>
          {/* Logo */}
          <div className="mb-8">
            <img
              src="https://s3.ca-central-1.amazonaws.com/logojoy/logos/68448935/noBgColor.png"
              alt="Logo"
              className="h-16 w-auto mx-auto mb-6"
            />
          </div>

          {/* Navigation Links */}
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <FiHome size={20} />
              <button
                className={`w-full text-left ${
                  activeComponent === "home" ? "text-[#BD9E5A]" : ""
                }`}
                onClick={() => setActiveComponent("home")}
              >
                Home
              </button>
            </li>
            <li className="flex items-center space-x-2">
              <FiLayers size={20} />
              <button
                className={`w-full text-left ${
                  activeComponent === "myQRCodes" ? "text-[#BD9E5A]" : ""
                }`}
                onClick={() => setActiveComponent("myQRCodes")}
              >
                My QR Codes
              </button>
            </li>
            <li className="flex items-center space-x-2">
              <FiBell size={20} />
              <button
                className={`w-full text-left ${
                  activeComponent === "notifications" ? "text-[#BD9E5A]" : ""
                }`}
                onClick={() => setActiveComponent("notifications")}
              >
                Notifications
              </button>
            </li>
            <li className="flex items-center space-x-2">
              <FiBarChart2 size={20} />
              <button
                className={`w-full text-left ${
                  activeComponent === "analytics" ? "text-[#BD9E5A]" : ""
                }`}
                onClick={() => setActiveComponent("analytics")}
              >
                Analytics
              </button>
            </li>
            <li className="flex items-center space-x-2">
              <FiLayers size={20} />
              <button
                className={`w-full text-left ${
                  activeComponent === "integrations" ? "text-[#BD9E5A]" : ""
                }`}
                onClick={() => setActiveComponent("integrations")}
              >
                Integrations
              </button>
            </li>
          </ul>
        </div>

        {/* User Profile and Info */}
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/50" // Placeholder profile image
            alt="User profile"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">
              {user ? getFirstName(user.displayName) : "User"}
            </p>
            <p className="text-xs">View profile</p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full bg-white p-6">
        {/* Top Bar with Logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">
            Hello, {user ? getFirstName(user.displayName) : "User"}
          </h1>
          <button
            className="bg-[#BD9E5A] text-white px-4 py-2 rounded hover:bg-opacity-90"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* QR Code List */}
        <div>
          <h2 className="text-lg font-bold mb-4">Generated QR Codes</h2>
          <div className="grid grid-cols-2 gap-8">
            {/* Example of a QR Code Item */}
            <div className="border p-4 rounded-lg shadow-md bg-white">
              <img
                src="https://via.placeholder.com/150"
                alt="QR Code"
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="font-semibold text-lg">Event QR</h3>
              <p className="text-sm text-gray-600">Link: cutt.ly/person4</p>
              <p className="text-sm text-gray-600">Clicks: 120</p>
              <button className="mt-4 bg-[#BD9E5A] text-white px-4 py-2 rounded">
                Share Link
              </button>
            </div>

            {/* Repeat QR code items here... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
