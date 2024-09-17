import React from "react";

const DocList = ({ docs }) => {
  return (
    <ul className="p-4">
      {docs.map((doc, index) => (
        <li
          key={index}
          className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-300"
        >
          <strong className="block text-[rgb(30,44,104)]">Farm Name:</strong>{" "}
          {doc.farmName} <br />
          <strong className="block text-[rgb(30,44,104)]">
            Location:
          </strong>{" "}
          {doc.location} <br />
          <strong className="block text-[rgb(30,44,104)]">Size:</strong>{" "}
          {doc.size} acres
        </li>
      ))}
    </ul>
  );
};

export default DocList;
