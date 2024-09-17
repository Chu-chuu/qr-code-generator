import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import DocList from "../components/DocList";

const FetchData = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection("Farm1").get();
        const data = snapshot.docs.map((doc) => doc.data());
        setDocs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <p className="text-center text-[rgb(30,44,104)]">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center text-[rgb(30,44,104)] mb-8">
        Fetched Data
      </h1>
      {/* Pass the fetched docs as a prop to the DocList component */}
      <DocList docs={docs} />
    </div>
  );
};

export default FetchData;
