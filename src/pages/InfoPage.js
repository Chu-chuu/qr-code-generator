import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const InfoPage = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
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
  }, [id, user]);

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
        <strong>Oil Produced from Seed:</strong> {farmData.oilFromSeed}
      </p>
      <p>
        <strong>Amount of Oil Produced:</strong> {farmData.oilProduced}
      </p>

      <h3 className="text-xl mt-6">
        Farm Processes and Additional Information
      </h3>
      <p>
        Cotton farming involves several key steps, including soil preparation,
        planting, pest management, and harvesting. Consistent yields and quality
        production depend on efficient water management, fertilizer application,
        and timely harvesting.
      </p>
      <p>
        After harvesting, cotton is ginned to separate the lint from the seeds.
        The lint is used for textile production, while the seeds can be used for
        oil extraction or other agricultural purposes.
      </p>
      <p>
        Advanced farming techniques, such as drip irrigation and integrated pest
        management, can enhance productivity and sustainability on cotton farms.
      </p>

      <h3 className="text-xl mt-6">Images</h3>
      {farmData.images && farmData.images.length > 0 ? (
        <div>
          {farmData.images.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Image ${index}`}
              style={{ width: "100%", maxWidth: "600px", marginBottom: "10px" }}
            />
          ))}
        </div>
      ) : (
        <p>No images available.</p>
      )}
    </div>
  );
};

export default InfoPage;
