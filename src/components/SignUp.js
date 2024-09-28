import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpWithEmailAndPassword, signInWithGoogle } from "../AuthProvider";
import TopBar from "./TopBar";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai"; // Icons for user, email, password
import { FiEye, FiEyeOff } from "react-icons/fi"; // Icons for view/hide password

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility toggle
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUpWithEmailAndPassword(email, password);
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

      {/* Form container with slender look */}
      <div className="w-full max-w-sm bg-white p-10 rounded-lg shadow-lg mt-8">
        <h1 className="text-2xl font-bold text-[rgb(30,44,104)] mb-2 text-center">
          Create an account
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Sign up with your email
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSignup}>
          <div className="mb-4 relative">
            {/* First Name Icon */}
            <AiOutlineUser className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full px-10 py-2 border rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[rgb(189,158,90)]"
            />
          </div>

          <div className="mb-4 relative">
            {/* Last Name Icon */}
            <AiOutlineUser className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full px-10 py-2 border rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[rgb(189,158,90)]"
            />
          </div>

          <div className="mb-4 relative">
            {/* Email Icon */}
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
            {/* Password Icon */}
            <AiOutlineLock className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-10 py-2 border rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[rgb(189,158,90)]"
            />
            {/* Eye toggle for password visibility */}
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

          <div className="mb-4 relative">
            {/* Confirm Password Icon */}
            <AiOutlineLock className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-10 py-2 border rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[rgb(189,158,90)]"
            />
            {/* Eye toggle for confirm password visibility */}
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FiEyeOff className="text-gray-400" />
              ) : (
                <FiEye className="text-gray-400" />
              )}
            </div>
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
            Sign Up with Google
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-10 -mb-5 text-center text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-[rgb(30,44,104)] font-semibold">
            Login
          </a>
        </p>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
