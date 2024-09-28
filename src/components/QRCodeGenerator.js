import React, { useState } from "react";
import QRCode from "react-qr-code";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiUpload } from "react-icons/fi"; // Icons for file upload buttons

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
    if (imageFile && imageFile.size > 1024 * 1024 * 1024) {
      alert("Image file size should be less than 5MB");
      return;
    }
    if (videoFile && videoFile.size > 1024 * 1024 * 1024) {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#1E2C68] p-10 rounded-lg shadow-lg text-white w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          QR Code Generator
        </h1>

        {user ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                name="farmName"
                value={farmData.farmName}
                onChange={handleInputChange}
                placeholder="Farm Name"
                className="w-full p-2 text-black rounded-lg"
                required
              />
              <input
                type="text"
                name="farmerName"
                value={farmData.farmerName}
                onChange={handleInputChange}
                placeholder="Farmer Name"
                className="w-full p-2 text-black rounded-lg"
                required
              />
              <input
                type="text"
                name="yieldPerAcre"
                value={farmData.yieldPerAcre}
                onChange={handleInputChange}
                placeholder="Yield per Acre"
                className="w-full p-2 text-black rounded-lg"
                required
              />
              <input
                type="text"
                name="oilProduced"
                value={farmData.oilProduced}
                onChange={handleInputChange}
                placeholder="Oil Produced"
                className="w-full p-2 text-black rounded-lg"
              />
            </div>

            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <FiUpload />
                <span>Upload Photo</span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <label className="flex items-center space-x-2">
                <FiUpload />
                <span>Upload Video</span>
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-[#DCC97E] rounded-lg text-black"
            >
              {isLoading ? "Generating..." : "Generate QR Code"}
            </button>
          </form>
        ) : (
          <p className="text-center">Please sign in to generate a QR code.</p>
        )}

        {qrCodeData && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Generated QR Code:</h2>
            <QRCode value={qrCodeData} className="mx-auto" />
            <p>Scan this QR code to view the farm details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;

// import React, { useState } from "react";
// import QRCode from "react-qr-code";
// import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { auth, db, storage } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Spinner } from "../components/Spinner"; // Spinner component to indicate loading

// const QRCodeGenerator = () => {
//   const [user] = useAuthState(auth);
//   const [farmData, setFarmData] = useState({
//     farmName: "",
//     farmerName: "",
//     yieldPerAcre: "",
//     oilProduced: "",
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [videoFile, setVideoFile] = useState(null);
//   const [qrCodeData, setQRCodeData] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFarmData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (name === "image") {
//       setImageFile(files[0]);
//     } else if (name === "video") {
//       setVideoFile(files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setUploadMessage("");

//     if (!user) {
//       alert("Please sign in to generate a QR code");
//       return;
//     }

//     if (!farmData.farmName || !farmData.farmerName || !farmData.yieldPerAcre) {
//       alert("Please fill out all required fields.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const docRef = await addDoc(collection(db, "farms"), farmData);
//       const docId = docRef.id;
//       let imageUrl = "";
//       let videoUrl = "";

//       // Handle Image Upload
//       if (imageFile) {
//         const imageRef = ref(storage, `farms/${docId}/image`);
//         await uploadBytes(imageRef, imageFile);
//         imageUrl = await getDownloadURL(imageRef);
//       }

//       // Handle Video Upload
//       if (videoFile) {
//         const videoRef = ref(storage, `farms/${docId}/video`);
//         await uploadBytes(videoRef, videoFile);
//         videoUrl = await getDownloadURL(videoRef);
//       }

//       // Update Firestore with image and video URLs
//       await updateDoc(doc(db, "farms", docId), {
//         imageUrl,
//         videoUrl,
//       });

//       // Generate QR code value pointing to the display page
//       const appUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
//       const qrCodeValue = `${appUrl}/display/${docId}`;
//       setQRCodeData(qrCodeValue);
//       setUploadMessage("QR Code generated successfully!");

//     } catch (error) {
//       console.error("Error generating QR code: ", error);
//       setUploadMessage(`Failed to generate QR code: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold text-center mb-6">Generate QR Code</h1>

//       {user ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input
//               type="text"
//               name="farmName"
//               value={farmData.farmName}
//               onChange={handleInputChange}
//               placeholder="Farm Name"
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="farmerName"
//               value={farmData.farmerName}
//               onChange={handleInputChange}
//               placeholder="Farmer Name"
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="yieldPerAcre"
//               value={farmData.yieldPerAcre}
//               onChange={handleInputChange}
//               placeholder="Yield per Acre"
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               name="oilProduced"
//               value={farmData.oilProduced}
//               onChange={handleInputChange}
//               placeholder="Oil Produced"
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div>
//             <input
//               type="file"
//               name="video"
//               accept="video/*"
//               onChange={handleFileChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
//           >
//             {isLoading ? <Spinner /> : "Generate QR Code"}
//           </button>

//           {uploadMessage && (
//             <div className={`text-center mt-4 ${uploadMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
//               {uploadMessage}
//             </div>
//           )}
//         </form>
//       ) : (
//         <p className="text-center">Please sign in to generate a QR code.</p>
//       )}

//       {qrCodeData && (
//         <div className="mt-6 text-center">
//           <h2 className="text-xl font-bold">Generated QR Code:</h2>
//           <div className="inline-block p-4 bg-gray-100 shadow-md rounded">
//             <QRCode value={qrCodeData} />
//           </div>
//           <p className="mt-2">Scan this QR code to view farm details.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QRCodeGenerator;
