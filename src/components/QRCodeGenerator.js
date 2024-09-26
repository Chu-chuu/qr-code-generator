import React, { useState } from "react";
import QRCode from "react-qr-code";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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

    // Optional: Check file sizes
    if (imageFile && imageFile.size > 5 * 1024 * 1024) {
      alert("Image file size should be less than 5MB");
      return;
    }
    if (videoFile && videoFile.size > 20 * 1024 * 1024) {
      alert("Video file size should be less than 20MB");
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

      // Generate QR code value pointing to the display page
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
    <div>
      <h1>Cotton Farming QR Code Generator</h1>
      {user ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="farmName"
            value={farmData.farmName}
            onChange={handleInputChange}
            placeholder="Farm Name"
            required
          />
          <input
            type="text"
            name="farmerName"
            value={farmData.farmerName}
            onChange={handleInputChange}
            placeholder="Farmer Name"
            required
          />
          <input
            type="text"
            name="yieldPerAcre"
            value={farmData.yieldPerAcre}
            onChange={handleInputChange}
            placeholder="Yield per Acre"
            required
          />
          <input
            type="text"
            name="oilProduced"
            value={farmData.oilProduced}
            onChange={handleInputChange}
            placeholder="Oil Produced"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleVideoChange}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate QR Code"}
          </button>
        </form>
      ) : (
        <p>Please sign in to generate a QR code.</p>
      )}

      {qrCodeData && (
        <div>
          <h2>Generated QR Code:</h2>
          <QRCode value={qrCodeData} />
          <p>Scan this QR code to view the farm details.</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
