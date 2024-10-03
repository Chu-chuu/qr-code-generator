import React, { useState } from "react";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState(auth.currentUser?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(
    auth.currentUser?.photoURL || "defaultProfilePicURL"
  );
  const navigate = useNavigate();

  // Function to handle updating the user's name
  const handleNameChange = async () => {
    if (name) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        }); // Include photoURL here
        setMessage("Name updated successfully!");
      } catch (error) {
        setMessage(`Error updating name: ${error.message}`);
      }
    }
  };

  // Function to handle profile photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Here you would upload the file to Firebase Storage
      // After upload, you would update the photo URL in Firebase Auth
      const newPhotoURL = "uploadedImageURL"; // Replace with the URL of the uploaded image
      setPhoto(newPhotoURL);
      updateProfile(auth.currentUser, { photoURL: newPhotoURL }).catch(
        (error) => {
          setMessage(`Error updating photo: ${error.message}`);
        }
      );
    }
  };

  // Function to reauthenticate user before changing password
  const reauthenticate = async (currentPassword) => {
    const user = auth.currentUser;
    const credentials = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    try {
      await reauthenticateWithCredential(user, credentials);
      return true;
    } catch (error) {
      setMessage(`Re-authentication failed: ${error.message}`);
      return false;
    }
  };

  // Function to handle updating the password
  const handlePasswordChange = async () => {
    const user = auth.currentUser;
    const reauthenticated = await reauthenticate(currentPassword);

    if (reauthenticated && newPassword) {
      try {
        await updatePassword(user, newPassword);
        setMessage("Password updated successfully!");
      } catch (error) {
        setMessage(`Error updating password: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[rgb(30,44,104)] mb-6 text-center">
          Profile Settings
        </h1>

        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={photo || "defaultProfilePicURL"} // Use the state variable
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mb-4"
          />
        </div>

        {/* Name change form */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(189,158,90)]"
          />
          <button
            onClick={handleNameChange}
            className="w-full bg-[rgb(30,44,104)] text-white py-2 px-4 rounded mt-4 hover:bg-[rgb(30,44,150)]"
          >
            Update Name
          </button>
        </div>

        {/* Password change form */}
        <div className="mt-6">
          <label className="block text-gray-700 mb-2">Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[rgb(189,158,90)]"
            placeholder="Enter current password"
          />
          <label className="block text-gray-700 mb-2">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[rgb(189,158,90)]"
            placeholder="Enter new password"
          />
          <button
            onClick={handlePasswordChange}
            className="w-full bg-[rgb(30,44,104)] text-white py-2 px-4 rounded mt-4 hover:bg-[rgb(30,44,150)]"
          >
            Update Password
          </button>
        </div>

        {/* Message output */}
        {message && (
          <p className="text-green-500 mt-4 text-center">{message}</p>
        )}

        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 bg-[rgb(189,158,90)] text-white py-2 px-4 rounded hover:bg-[rgb(175,145,80)] w-full"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
