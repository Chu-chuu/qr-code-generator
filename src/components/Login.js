import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPasswordFunc,
  signInWithGoogle,
} from "../AuthProvider";
import TopBar from "./TopBar";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai"; // Icons for email and password
import { FiEye, FiEyeOff } from "react-icons/fi"; // Icons for view/hide password

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPasswordFunc(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <TopBar />
      <div className="w-full max-w-sm bg-white p-10 rounded-lg shadow-lg mt-8">
        <h1 className="text-2xl font-bold text-[rgb(30,44,104)] mb-2 text-center">
          Welcome back 👋
        </h1>
        <p className="text-gray-500 text-center mb-6">Log in your account</p>
        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4 relative">
            <AiOutlineMail className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="What is your e-mail?"
              className="w-full px-10 py-2 border rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[rgb(189,158,90)]"
            />
          </div>
          <div className="mb-4 relative">
            <AiOutlineLock className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-10 py-2 border rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[rgb(189,158,90)]"
            />

            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff className="text-gray-400" />
              ) : (
                <FiEye className="text-gray-400" />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <label className="text-gray-700">Remember me</label>
            </div>
            <a href="/password-reset" className="text-[rgb(30,44,104)] text-sm">
              Forgot password?
            </a>
          </div>

          {/* Button styling */}
          <button
            type="submit"
            className="w-full bg-[rgb(189,158,90)] text-white py-2 px-4 rounded-md hover:bg-[rgb(220,201,126)] mb-4"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-[rgb(30,44,104)] text-white py-2 px-4 rounded-md hover:bg-[rgb(30,44,150)]"
          >
            Login with Google
          </button>
        </form>

        {/* Link to Sign Up */}
        <p className="mt-10 -mb-5  text-center text-gray-700">
          Don't have an account?{" "}
          <a href="/signup" className="text-[rgb(30,44,104)] font-semibold">
            Sign up
          </a>
        </p>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
