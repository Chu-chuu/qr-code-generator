// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { logOut } from "../AuthProvider";
// import { useAuthState } from "react-firebase-hooks/auth";
// import QRCodeItem from "../components/QRCodeItem"; // Component for displaying QR codes
// import { db, auth } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import QRCodeGenerator from "../components/QRCodeGenerator";
// import { FiHome, FiGrid } from "react-icons/fi"; // Icons for Home and QR Code Generator

// const Dashboard = () => {
//   const [activeComponent, setActiveComponent] = useState("home");
//   const [user, loading] = useAuthState(auth);
//   const [farms, setFarms] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/"); // Redirect to login if user is not logged in
//     }
//   }, [user, loading, navigate]);

//   useEffect(() => {
//     const fetchFarms = async () => {
//       try {
//         // Fetch QR Codes from the "farms" collection
//         const farmsSnapshot = await getDocs(collection(db, "farms"));
//         const farmsData = farmsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setFarms(farmsData);
//       } catch (error) {
//         console.error("Error fetching farms:", error);
//       }
//     };

//     fetchFarms();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await logOut();
//       navigate("/"); // Redirect to login after successful logout
//     } catch (error) {
//       console.error("Failed to log out:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-[#1E2C68] text-white p-6">
//         {/* Logo */}
//         <div className="flex items-center space-x-2 mb-8">
//           <img
//             src="https://s3.ca-central-1.amazonaws.com/logojoy/logos/68448935/noBgColor.png"
//             alt="Logo"
//             className="h-16 w-auto"
//           />
//         </div>

//         {/* Sidebar Items */}
//         <ul className="space-y-4">
//           <li>
//             <button
//               className={`flex items-center space-x-2 w-full text-left p-2 rounded ${
//                 activeComponent === "home" ? "bg-[#BD9E5A]" : ""
//               }`}
//               onClick={() => setActiveComponent("home")}
//             >
//               <FiHome className="text-white" />
//               <span>Home</span>
//             </button>
//           </li>
//           <li>
//             <button
//               className={`flex items-center space-x-2 w-full text-left p-2 rounded ${
//                 activeComponent === "qrCodeGenerator" ? "bg-[#BD9E5A]" : ""
//               }`}
//               onClick={() => setActiveComponent("qrCodeGenerator")}
//             >
//               <FiGrid className="text-white" />
//               <span>QR Code Generator</span>
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content Area */}
//       <div className="w-3/4 bg-gray-100">
//         {/* Top Navigation */}
//         <div className="w-full bg-white p-4 shadow-md flex justify-between items-center">
//           <h1 className="text-2xl font-bold">
//             {user && `Hello, ${user.displayName.split(" ")[0]}`}{" "}
//             {/* First name */}
//           </h1>
//           <button
//             className="bg-[#DCC97E] text-white px-4 py-2 rounded"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>

//         {/* Main Dashboard Content */}
//         <div className="p-6">
//           {activeComponent === "home" ? (
//             <div>
//               <h2 className="text-xl font-bold mb-4">Generated QR Codes</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {farms.length > 0 ? (
//                   farms.map((farm, index) => (
//                     <QRCodeItem key={index} qrCode={farm} />
//                   ))
//                 ) : (
//                   <p>No QR Codes generated yet.</p>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <QRCodeGenerator />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../AuthProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import QRCodeItem from "../components/QRCodeItem";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import QRCodeGenerator from "../components/QRCodeGenerator";
import Navigation from "../components/Navigation";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("home");
  const [user, loading] = useAuthState(auth);
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/"); // Redirect to login if user is not logged in
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const farmsSnapshot = await getDocs(collection(db, "farms"));
        const farmsData = farmsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFarms(farmsData);
      } catch (error) {
        console.error("Error fetching farms:", error);
      }
    };

    fetchFarms();
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/"); // Redirect to login after successful logout
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const firstName = user?.displayName?.split(" ")[0] || "Guest"; // Handle null or empty displayName

  return (
    <div className="min-h-screen flex">
      <Navigation
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        handleLogout={handleLogout}
      />

      <div className="w-3/4 bg-gray-100">
        <div className="w-full bg-white p-4 shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {`Hello, ${firstName}`}
          </h1>

          <div className="flex items-center space-x-4">
            <img
              src={user?.photoURL || "default_profile_picture.png"}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div className="text-right">
              <p className="font-semibold">{firstName}</p>
              <button
                className="text-blue-500"
                onClick={() => navigate("/profile")}
              >
                View Profile
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeComponent === "home" ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Generated QR Codes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {farms.length > 0 ? (
                  farms.map((farm, index) => (
                    <QRCodeItem key={index} qrCode={farm} />
                  ))
                ) : (
                  <p>No QR Codes generated yet.</p>
                )}
              </div>
            </div>
          ) : (
            <QRCodeGenerator />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
