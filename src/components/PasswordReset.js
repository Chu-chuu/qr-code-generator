import React, { useState } from "react";
import { sendPasswordResetEmail } from "../AuthProvider"; // Assuming this is your custom provider
import { auth } from "../firebase"; // Firebase setup

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email); // Send password reset email via Firebase
      setMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[rgb(30,44,104)] mb-6">
          Reset Your Password
        </h1>
        <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(189,158,90)]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[rgb(30,44,104)] text-white py-2 px-4 rounded hover:bg-[rgb(30,44,150)]"
          >
            Send Password Reset Email
          </button>
        </form>
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;
