import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiHome, FiLayers, FiGrid, FiLogOut } from "react-icons/fi"; // Icons for sidebar
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Navigation = ({ activeComponent, setActiveComponent, handleLogout }) => {
  return (
    <div className="w-1/4 bg-[#1E2C68] text-white p-6 flex flex-col justify-between">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-8">
          <img
            src="https://s3.ca-central-1.amazonaws.com/logojoy/logos/68448935/noBgColor.png"
            alt="Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Sidebar Items */}
        <ul className="space-y-4">
          <li>
            <button
              className={`flex items-center space-x-2 w-full text-left p-2 rounded ${
                activeComponent === "home" ? "bg-[#BD9E5A]" : ""
              }`}
              onClick={() => setActiveComponent("home")}
            >
              <FiHome className="text-white" />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button
              className={`flex items-center space-x-2 w-full text-left p-2 rounded ${
                activeComponent === "qrCodeGenerator" ? "bg-[#BD9E5A]" : ""
              }`}
              onClick={() => setActiveComponent("qrCodeGenerator")}
            >
              <FiGrid className="text-white" />
              <span>QR Code Generator</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          className="flex items-center space-x-2 w-full text-left p-2 rounded bg-[#DCC97E] hover:bg-[#c3b07a]"
          onClick={handleLogout}
        >
          <FiLogOut className="text-white" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
