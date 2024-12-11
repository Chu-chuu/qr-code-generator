import React, { useState } from "react";
import QRCode from "react-qr-code";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiUpload } from "react-icons/fi";
const useFormInput = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  return [formData, handleInputChange];
};
const useMultipleFileInput = () => {
  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    const { files: selectedFiles } = e.target;
    setFiles(Array.from(selectedFiles));
  };
  return [files, handleFileChange];
};
const QRCodeGenerator = () => {
  const [user] = useAuthState(auth);
  const [farmData, handleInputChange] = useFormInput({
    farmName: "",
    farmerName: "",
    yieldPerAcre: "",
    amountPerAcre: "",
    lintByAcre: "",
    oilProduced: "",
    farmDescription: "",
  });
  const [imageFiles, handleImageChange] = useMultipleFileInput();
  const [videoFiles, handleVideoChange] = useMultipleFileInput();
  const [qrCodeData, setQRCodeData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to generate a QR code");
      return;
    }
    // Validate required fields
    const requiredFields = [
      "farmerName",
      "yieldPerAcre",
      "oilProduced",
      "farmDescription",
    ];
    for (const field of requiredFields) {
      if (!farmData[field]) {
        alert(`Please fill out all required fields: ${field}`);
        return;
      }
    }
    setIsLoading(true);
    try {
      // Add farm data to Firestore
      const docRef = await addDoc(collection(db, "farms"), farmData);
      const docId = docRef.id;
      const uploadFiles = async (files, folder) => {
        const uploadPromises = files.map(async (file) => {
          const fileRef = ref(storage, `farms/${docId}/${folder}/${file.name}`);
          await uploadBytes(fileRef, file);
          return getDownloadURL(fileRef);
        });
        return Promise.all(uploadPromises);
      };
      // Upload images and get URLs
      const imageUrls = imageFiles.length
        ? await uploadFiles(imageFiles, "images")
        : [];
      // Upload videos and get URLs
      const videoUrls = videoFiles.length
        ? await uploadFiles(videoFiles, "videos")
        : [];
      // Update Firestore with the uploaded file URLs
      const farmDocRef = doc(db, "farms", docId);
      await updateDoc(farmDocRef, { imageUrls, videoUrls });
      const appUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
      const qrCodeValue = `${appUrl}/display/${docId}`;
      setQRCodeData(qrCodeValue);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#1E2C68] p-10 rounded-lg shadow-lg text-white w-full max-w-7xl flex">
        {/* Form Section */}
        <div className="w-1/2 mr-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            QR Code Generator
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Farmer Name */}
            <div>
              <label htmlFor="farmerName" className="block font-medium">
                Farmer Name
              </label>
              <input
                type="text"
                id="farmerName"
                name="farmerName"
                value={farmData.farmerName}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              />
            </div>
            {/* Yield Per Acre */}
            <div>
              <label htmlFor="yieldPerAcre" className="block font-medium">
                Yield Per Acre
              </label>
              <input
                type="text"
                id="yieldPerAcre"
                name="yieldPerAcre"
                value={farmData.yieldPerAcre}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              />
            </div>
            {/* Amount Per Acre */}
            <div>
              <label htmlFor="amountPerAcre" className="block font-medium">
                By Products
              </label>
              <input
                type="text"
                id="byProducts"
                name="byProducts"
                value={farmData.byProducts}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              />
            </div>
            {/* Lint By Acre */}
            {/* <div>
              <label htmlFor="lintByAcre" className="block font-medium">
                By-Product
              </label>
              <input
                type="text"
                id="lintByAcre"
                name="lintByAcre"
                value={farmData.lintByAcre}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              />
            </div> */}
            {/* Oil Produced */}
            <div>
              <label htmlFor="oilProduced" className="block font-medium">
                Oil Produced
              </label>
              <input
                type="text"
                id="oilProduced"
                name="oilProduced"
                value={farmData.oilProduced}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              />
            </div>
            {/* Farm Description */}
            <div>
              <label htmlFor="farmDescription" className="block font-medium">
                Farm Description
              </label>
              <textarea
                id="farmDescription"
                name="farmDescription"
                value={farmData.farmDescription}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              ></textarea>
            </div>
            {/* Multiple Image Upload */}
            <div>
              <label htmlFor="imageFiles" className="block font-medium">
                Upload Images
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  id="imageFiles"
                  onChange={handleImageChange}
                  multiple
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <FiUpload className="text-gray-500" />
              </div>
            </div>
            {/* Multiple Video Upload */}
            <div>
              <label htmlFor="videoFiles" className="block font-medium">
                Upload Videos
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  id="videoFiles"
                  onChange={handleVideoChange}
                  multiple
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <FiUpload className="text-gray-500" />
              </div>
            </div>
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#BD9E5A] text-white px-6 py-2 rounded-lg shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate QR Code"}
              </button>
            </div>
          </form>
        </div>
        {/* QR Code Display Section */}
        {qrCodeData && (
          <div className="w-1/2 flex justify-center items-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Generated QR Code</h2>
              <QRCode value={qrCodeData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default QRCodeGenerator;








