import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import QRCodeGenerator from "./components/QRCodeGenerator";
import Auth from "./components/Auth";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/qrcode" element={<QRCodeGenerator />} />
      </Routes>
    </Router>
  );
};

export default App;
