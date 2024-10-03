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

const useFileInput = (initialState) => {
  const [file, setFile] = useState(initialState);

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFile(files[0]);
  };

  return [file, handleFileChange];
};

const QRCodeGenerator = () => {
  const [user] = useAuthState(auth);
  const [farmData, handleInputChange] = useFormInput({
    farmName: "",
    farmerName: "",
    yieldPerAcre: "",
    oilProduced: "",
  });
  const [imageFile, handleImageChange] = useFileInput(null);
  const [videoFile, handleVideoChange] = useFileInput(null);
  const [qrCodeData, setQRCodeData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please sign in to generate a QR code");
      return;
    }

    if (!farmData.farmName || !farmData.farmerName || !farmData.yieldPerAcre) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, "farms"), farmData);
      const docId = docRef.id;

      let imageUrl = "";
      let videoUrl = "";

      if (imageFile) {
        const imageRef = ref(storage, `farms/${docId}/image`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (videoFile) {
        const videoRef = ref(storage, `farms/${docId}/video`);
        await uploadBytes(videoRef, videoFile);
        videoUrl = await getDownloadURL(videoRef);
      }

      const farmDocRef = doc(db, "farms", docId);
      await updateDoc(farmDocRef, { imageUrl, videoUrl });

      const appUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
      const qrCodeValue = `${appUrl}/display/${docRef.id}`;
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
            {/* Farm Name */}
            <div>
              <label htmlFor="farmName" className="block font-medium">
                Farm Name
              </label>
              <input
                type="text"
                id="farmName"
                name="farmName"
                value={farmData.farmName}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
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
                className="w-full p-2 border border-gray-300 rounded-md"
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Image Upload */}
            <div>
              <label htmlFor="imageFile" className="block font-medium">
                Upload Image
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  id="imageFile"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <FiUpload className="text-gray-500" />
              </div>
            </div>
            {/* Video Upload */}
            <div>
              <label htmlFor="videoFile" className="block font-medium">
                Upload Video
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  id="videoFile"
                  onChange={handleVideoChange}
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
