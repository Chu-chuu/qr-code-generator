// import React, { useState } from "react";
// import {
//   signInWithGoogle,
//   signInWithEmailAndPasswordFunc,
//   signUpWithEmailAndPassword,
// } from "../AuthProvider";
// import { useNavigate } from "react-router-dom";

// const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSignUp = async (event) => {
//     event.preventDefault();
//     try {
//       await signUpWithEmailAndPassword(email, password);
//       navigate("/dashboard");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleSignIn = async (event) => {
//     event.preventDefault();
//     try {
//       await signInWithEmailAndPasswordFunc(email, password);
//       navigate("/dashboard");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithGoogle();
//       navigate("/dashboard");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold text-[rgb(30,44,104)] mb-6">
//           Welcome to Mishkan Group QR Generator
//         </h1>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(189,158,90)]"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(event) => setPassword(event.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(189,158,90)]"
//             />
//           </div>
//           <div className="flex justify-between mb-6">
//             <button
//               onClick={handleSignUp}
//               className="bg-[rgb(30,44,104)] text-white py-2 px-4 rounded hover:bg-[rgb(30,44,150)]"
//             >
//               Sign Up
//             </button>
//             <button
//               onClick={handleSignIn}
//               className="bg-[rgb(189,158,90)] text-white py-2 px-4 rounded hover:bg-[rgb(179,148,80)]"
//             >
//               Sign In
//             </button>
//           </div>
//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//           >
//             Sign In with Google
//           </button>
//         </form>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Auth;
