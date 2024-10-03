import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import QRCodeGenerator from "./components/QRCodeGenerator";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PasswordReset from "./components/PasswordReset";
import InfoPage from "./pages/InfoPage";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/qrcode" element={<QRCodeGenerator />} />
        <Route path="/display/:id" element={<InfoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
