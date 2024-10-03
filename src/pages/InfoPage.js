import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const InfoPage = () => {
  const { id } = useParams();
  const [farmData, setFarmData] = useState(null);

  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        const docRef = doc(db, "farms", id);
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
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Image Carousel */}
      {farmData.imageUrl ? (
        <div className="mb-8">
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            className="max-w-4xl mx-auto shadow-lg rounded-lg"
          >
            {farmData.imageUrl.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Farm Image ${index + 1}`}
                  className="object-cover"
                  style={{ height: "400px" }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="text-center text-gray-500 mb-8">
          No images available.
        </div>
      )}

      {/* Farm Information */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Farm Information
        </h2>
        <p className="text-lg mb-4">
          <strong>Farm Name:</strong> {farmData.farmName}
        </p>
        <p className="text-lg mb-4">
          <strong>Farmer Name:</strong> {farmData.farmerName}
        </p>
        <p className="text-lg mb-4">
          <strong>Yield per Acre:</strong> {farmData.yieldPerAcre}
        </p>
        <p className="text-lg mb-4">
          <strong>Amount per Acre:</strong> {farmData.amountPerAcre}
        </p>
        <p className="text-lg mb-4">
          <strong>Lint by Acre:</strong> {farmData.lintByAcre}
        </p>
        <p className="text-lg mb-4">
          <strong>Oil Produced from Seed:</strong> {farmData.oilFromSeed}
        </p>
        <p className="text-lg mb-4">
          <strong>Amount of Oil Produced:</strong> {farmData.oilProduced}
        </p>

        {/* Farm Processes */}
        <h3 className="text-2xl font-semibold mt-8 mb-4">
          Farm Processes and Additional Information
        </h3>
        <p className="text-lg mb-4">
          Cotton farming involves several key steps, including soil preparation,
          planting, pest management, and harvesting...
        </p>

        {/* Video Section */}
        {farmData.videoUrl ? (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Farm Video</h3>
            <video
              controls
              style={{ width: "100%", maxWidth: "600px" }}
              className="mx-auto"
            >
              <source src={farmData.videoUrl} type="video/mp4" />
            </video>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">No video available.</p>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
