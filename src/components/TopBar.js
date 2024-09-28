import React from "react";

const TopBar = () => {
  return (
    <div className="flex justify-start items-center w-full bg-[rgb(30,44,104)] p-2">
      {/* Increased size of logo */}
      <img
        src="https://s3.ca-central-1.amazonaws.com/logojoy/logos/68448935/noBgColor.png"
        alt="Your Company Logo"
        className="w-30 h-12 mr-4"
      />
    </div>
  );
};

export default TopBar;
