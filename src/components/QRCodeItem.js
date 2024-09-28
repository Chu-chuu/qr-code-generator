import React from "react";

const QRCodeItem = ({ qrCode }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <img
        src={qrCode.imageUrl}
        alt="QR Code"
        className="w-full h-40 object-contain"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{qrCode.name}</h3>
        <p className="text-sm text-gray-600">Link: {qrCode.link}</p>
        <p className="text-sm text-gray-600">Clicks: {qrCode.clicks}</p>
        <button
          className="mt-4 bg-[#BD9E5A] text-white px-4 py-2 rounded"
          onClick={() => navigator.clipboard.writeText(qrCode.link)}
        >
          Share Link
        </button>
      </div>
    </div>
  );
};

export default QRCodeItem;
