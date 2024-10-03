import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

const InfoPage = () => {
  const { id } = useParams(); // Get the document ID from the URL
  const [farmData, setFarmData] = useState(null);

  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        const docRef = doc(db, "farms", id); // Fetch the correct document by ID
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFarmData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchFarmData();
  }, [id]);

  if (!farmData)
    return <div className="text-center text-xl p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img
          src="https://s3.ca-central-1.amazonaws.com/logojoy/logos/68448935/noBgColor.png"
          alt="Company Logo"
          className="w-24 h-24"
        />
      </div>

      {/* Carousel for Images */}
      <div className="mb-8">
        {farmData.images && farmData.images.length > 0 ? (
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            className="max-w-3xl mx-auto"
          >
            {farmData.images.map((imageUrl, index) => (
              <div key={index}>
                <img src={imageUrl} alt={`Farm Image ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        ) : (
          <p className="text-center text-gray-500">No images available.</p>
        )}
      </div>

      {/* Farm Information */}
      <div className="max-w-3xl mx-auto bg-[#1E2C68] text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl mb-4 font-bold">Farm Information</h2>
        <p className="mb-2">
          <strong>Farm Name:</strong> {farmData.farmName}
        </p>
        <p className="mb-2">
          <strong>Farmer Name:</strong> {farmData.farmerName}
        </p>
        <p className="mb-2">
          <strong>Yield per Acre:</strong> {farmData.yieldPerAcre}
        </p>
        <p className="mb-2">
          <strong>Amount per Acre:</strong> {farmData.amountPerAcre}
        </p>
        <p className="mb-2">
          <strong>Lint by Acre:</strong> {farmData.lintByAcre}
        </p>
        <p className="mb-2">
          <strong>Oil Produced from Seed:</strong> {farmData.oilFromSeed}
        </p>
        <p className="mb-2">
          <strong>Amount of Oil Produced:</strong> {farmData.oilProduced}
        </p>
      </div>

      {/* Additional Information */}
      <div className="max-w-3xl mx-auto mt-8 bg-[#BD9E5A] text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">
          Farm Processes and Additional Information
        </h3>
        <p className="text-lg leading-relaxed">
          Cotton farming involves several key steps, including soil preparation,
          planting, pest management, and harvesting...
        </p>
      </div>

      {/* Video Section */}
      <div className="max-w-3xl mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-[#1E2C68]">Video</h3>
        {farmData.videoUrl ? (
          <video controls className="w-full max-w-3xl">
            <source src={farmData.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <p className="text-center text-gray-500">No video available.</p>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
