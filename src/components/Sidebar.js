import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-1/4 bg-[#1E2C68] text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user && <p className="text-lg">Welcome, {user.displayName}</p>}
      <ul className="space-y-2">
        <li>
          <button
            className={`block w-full text-left p-2 rounded ${
              activeComponent === "home" ? "bg-[#BD9E5A]" : ""
            }`}
            onClick={() => setActiveComponent("home")}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={`block w-full text-left p-2 rounded ${
              activeComponent === "qrCodeGenerator" ? "bg-[#BD9E5A]" : ""
            }`}
            onClick={() => setActiveComponent("qrCodeGenerator")}
          >
            QR Code Generator
          </button>
        </li>
      </ul>
      <button
        className="w-full mt-8 bg-red-500 p-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
