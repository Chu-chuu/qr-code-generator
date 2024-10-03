import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1E2C68] mb-4">
          Cotton Farm Information
        </h1>
        <p className="text-lg text-gray-600">
          Discover more about our cotton farms and sustainable practices.
        </p>
      </div>

      {/* Carousel for displaying images */}
      {farmData.images && farmData.images.length > 0 && (
        <div className="mb-8">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={3000}
            infinite
            containerClass="carousel-wrapper mb-6"
            responsive={{
              superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 5,
              },
              desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
              tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
              mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
            }}
          >
            {farmData.images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Farm Image ${index + 1}`}
                className="rounded-lg mx-auto"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            ))}
          </Carousel>
        </div>
      )}

      {/* Farm Information Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#BD9E5A] mb-4">Farm Details</h2>
        <div className="text-gray-700">
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
            <strong>Amount of Oil Produced:</strong> {farmData.oilProduced}
          </p>
        </div>
      </div>

      {/* Farm Video Section */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#BD9E5A] mb-4">Farm Video</h3>
        {farmData.videoUrl ? (
          <video controls className="w-full max-w-xl mx-auto">
            <source src={farmData.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="text-gray-500">No video available.</p>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
