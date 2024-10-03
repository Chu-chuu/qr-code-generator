import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Carousel from "react-multi-carousel"; // You can use a carousel package
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
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#1E2C68] mb-6">
          Cotton Farm Information
        </h1>
      </div>

      {/* Carousel for displaying images */}
      {farmData.images && farmData.images.length > 0 && (
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={3000}
          centerMode={false}
          className="carousel-wrapper mb-6"
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 3000 },
              items: 5,
            },
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
          }}
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
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
      )}

      {/* Farm Information */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-[#BD9E5A]">Farm Details</h2>
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
          <strong>Oil Produced from Seed:</strong> {farmData.oilFromSeed}
        </p>
        <p>
          <strong>Amount of Oil Produced:</strong> {farmData.oilProduced}
        </p>
      </div>

      {/* Video */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#BD9E5A]">Farm Video</h3>
        {farmData.videoUrl ? (
          <video controls className="w-full max-w-xl mx-auto mt-4">
            <source src={farmData.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No video available.</p>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
