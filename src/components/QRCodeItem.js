import React from "react";
const QRCodeItem = ({ qrCode }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-semibold">{qrCode.farmName}</h3>
      <p>{qrCode.description}</p>
      {/* Display QR Code if there's a URL for it */}
      {qrCode.qrCodeURL && (
        <img
          src={qrCode.qrCodeURL}
          alt={`QR Code for ${qrCode.farmName}`}
          className="w-full h-auto mt-4"
        />
      )}
      {/* Additional details */}
      <p className="mt-2 text-sm">
        Farmer Name: <span className="font-bold">{qrCode.farmerName}</span>
      </p>
      <p className="mt-2 text-sm">Amount per Acre: {qrCode.amountPerAcre}</p>
      {/* <p className="mt-2 text-sm">Lint by Acre: {qrCode.lintByAcre}</p> */}
      <p className="mt-2 text-sm">
        Oil Produced from Seed: {qrCode.oilProduced}
      </p>
    </div>
  );
};
export default QRCodeItem;






