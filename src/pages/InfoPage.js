import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const InfoPage = () => {
  const { id } = useParams(); // Get the document ID from the URL
  const [farmData, setFarmData] = useState(null);

  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        const docRef = doc(db, "farms", id); // Fetch the correct document by ID
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFarmData(docSnap.data()); // Set the farm data from the document
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchFarmData();
  }, [id]);

  if (!farmData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl mb-4">Farm Information</h2>
      <p>
        <strong>Farm Name:</strong> {farmData.farmName}
      </p>
      <p>
        <strong>Farmer Name:</strong> {farmData.farmerName}
      </p>
      <p>
        <strong>Yield per Acre:</strong> {farmData.yieldPerAcre}
      </p>
      <p>
        <strong>Amount per Acre:</strong> {farmData.amountPerAcre}
      </p>
      <p>
        <strong>Lint by Acre:</strong> {farmData.lintByAcre}
      </p>
      <p>
        <strong>Oil Produced from Seed:</strong> {farmData.oilProduced}
      </p>

      <h3 className="text-xl mt-6">
        Farm Processes and Additional Information
      </h3>
      <p>
        Cotton farming involves several key steps, including soil preparation,
        planting, pest management, and harvesting...
      </p>

      <h3 className="text-xl mt-6">Images</h3>
      {farmData.imageUrls && farmData.imageUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {farmData.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Farm Image ${index + 1}`}
              className="w-full max-w-xs"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </div>
      ) : (
        <p>No images available.</p>
      )}

      <h3 className="text-xl mt-6">Videos</h3>
      {farmData.videoUrls && farmData.videoUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {farmData.videoUrls.map((url, index) => (
            <video key={index} controls className="w-full max-w-xs">
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      ) : (
        <p>No videos available.</p>
      )}
    </div>
  );
};

export default InfoPage;
