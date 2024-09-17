import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { signOut } from "../AuthProvider"; // Import signOut function from AuthProvider
import { useAuthState } from "react-firebase-hooks/auth";
import QRCodeGenerator from "../components/QRCodeGenerator"; // Import QR Code Generator

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("home");
  const navigate = useNavigate();

  // Handle logout and redirect to the login page
  const handleLogout = async () => {
    try {
      await signOut();
      navigate.push("/"); // Redirect to login after successful logout
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return <h2>Welcome to your Dashboard!</h2>;
      case "qrCodeGenerator":
        return <QRCodeGenerator />;
      default:
        return <h2>Component not found</h2>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-600 text-white p-6 space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ul className="space-y-2">
          <li>
            <button
              className={`block w-full text-left p-2 rounded ${
                activeComponent === "home" ? "bg-blue-500" : ""
              }`}
              onClick={() => setActiveComponent("home")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`block w-full text-left p-2 rounded ${
                activeComponent === "qrCodeGenerator" ? "bg-blue-500" : ""
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

      {/* Main Content Area */}
      <div className="w-3/4 p-6">
        {renderComponent()} {/* Display the selected component */}
      </div>
    </div>
  );
};

export default Dashboard;
