// import React, { useState, useEffect } from "react";

// import { useNavigate } from "react-router-dom";

// import { logOut } from "../AuthProvider"; // Import signOut function from AuthProvider
// import { useAuthState } from "react-firebase-hooks/auth";
// import QRCodeGenerator from "../components/QRCodeGenerator"; // Import QR Code Generator
// import { auth } from "../AuthProvider";

// const Dashboard = () => {
//   const [activeComponent, setActiveComponent] = useState("home");
//   const navigate = useNavigate();
//   const [user] = useAuthState(auth);

//   // Check if user is logged out and redirect to login
//   useEffect(() => {
//     if (!user) {
//       navigate("/"); // Redirect to login page if user is not logged in
//     }
//   }, [user, navigate]);

//   // Handle logout and redirect to the login page
//   const handleLogout = async () => {
//     try {
//       await logOut();
//       navigate("/"); // Redirect to login after successful logout
//     } catch (error) {
//       console.error("Failed to log out:", error);
//     }
//   };

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case "home":
//         return <h2>Welcome to your Dashboard!</h2>;
//       case "qrCodeGenerator":
//         return <QRCodeGenerator />;
//       default:
//         return <h2>Component not found</h2>;
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-blue-600 text-white p-6 space-y-4">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <ul className="space-y-2">
//           <li>
//             <button
//               className={`block w-full text-left p-2 rounded ${
//                 activeComponent === "home" ? "bg-blue-500" : ""
//               }`}
//               onClick={() => setActiveComponent("home")}
//             >
//               Home
//             </button>
//           </li>
//           <li>
//             <button
//               className={`block w-full text-left p-2 rounded ${
//                 activeComponent === "qrCodeGenerator" ? "bg-blue-500" : ""
//               }`}
//               onClick={() => setActiveComponent("qrCodeGenerator")}
//             >
//               QR Code Generator
//             </button>
//           </li>
//         </ul>
//         <button
//           className="w-full mt-8 bg-red-500 p-2 rounded hover:bg-red-600"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>

//       {/* Main Content Area */}
//       <div className="w-3/4 p-6">
//         {renderComponent()} {/* Display the selected component */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../AuthProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import QRCodeGenerator from "../components/QRCodeGenerator"; // Import QR Code Generator
import { db, auth } from "../firebase"; // Firebase setup
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("home");
  const [user, loading] = useAuthState(auth);
  const [qrCodeCount, setQrCodeCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect once Firebase auth state is resolved (not loading)
    if (!loading && !user) {
      navigate("/"); // Redirect to login if user is not logged in
    }
  }, [user, loading, navigate]);

  // Fetch QR Code stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const qrCodesSnapshot = await getDocs(collection(db, "qrCodes"));
        const clicksSnapshot = await getDocs(collection(db, "clicks"));

        setQrCodeCount(qrCodesSnapshot.size);
        setClickCount(clicksSnapshot.size);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/"); // Redirect to login after successful logout
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // Render components based on the active tab
  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return (
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <p>QR Codes Generated: {qrCodeCount}</p>
            <p>Total Clicks on QR Codes: {clickCount}</p>
          </div>
        );
      case "qrCodeGenerator":
        return <QRCodeGenerator />;
      default:
        return <h2>Component not found</h2>;
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="min-h-[95vh] min-w-[95vw] max-w-screen-lg bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-blue-600 text-white p-6 space-y-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {user && <p className="text-lg">Welcome, {user.displayName}</p>}
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
    </div>
  );
};

export default Dashboard;
