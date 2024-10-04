import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

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

  if (!farmData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Top navigation */}
      <nav className="flex justify-between items-center p-4 bg-[#1E2C68]">
        <img
          src="https://s3.ca-central-1.amazonaws.com/logojoy/logos/68448935/noBgColor.png"
          alt="Company Logo"
          className="h-12"
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
          Get in Touch
        </button>
      </nav>

      {/* Banner Section - Image Carousel */}
      <section className="bg-gray-200">
        {farmData.imageUrls && farmData.imageUrls.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            modules={[Pagination, Navigation]}
            className="w-full"
          >
            {farmData.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`Farm Image ${index + 1}`}
                  className="w-full h-[500px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No images available.</p>
        )}
      </section>

      {/* About Us Section */}
      <section className="p-8 text-center">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Discover the journey of Cotton Farming, where tradition meets
          innovation. Our cotton is farmed with dedication to sustainability and
          quality.
        </p>
        <img
          src="https://via.placeholder.com/800x400"
          alt="About Us"
          className="w-full h-auto mt-6"
        />
      </section>

      {/* How We Farm Section (Video) */}
      <section className="p-8 bg-gray-100">
        <h2 className="text-4xl font-bold mb-4">How We Farm</h2>
        {farmData.videoUrls && farmData.videoUrls.length > 0 ? (
          <video controls className="w-full max-w-4xl mx-auto">
            <source src={farmData.videoUrls[0]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No videos available.</p>
        )}
      </section>

      {/* Cotton Farming Details - Cards Section */}
      <section className="p-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Our Cotton Farming Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-lg p-4">
            <h3 className="text-2xl font-semibold">Yield per Acre</h3>
            <p>{farmData.yieldPerAcre} kg</p>
          </div>
          <div className="bg-white shadow-lg p-4">
            <h3 className="text-2xl font-semibold">Oil Produced</h3>
            <p>{farmData.oilProduced} liters</p>
          </div>
          <div className="bg-white shadow-lg p-4">
            <h3 className="text-2xl font-semibold">Lint by Acre</h3>
            <p>{farmData.lintByAcre} kg</p>
          </div>
          {/* Add more cards as needed */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-6 text-center">
        <p>Ready to transform your farm? Get in touch!</p>
      </footer>
    </div>
  );
};

export default InfoPage;
