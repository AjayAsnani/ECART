import React from "react";

const CheckoutDialog = ({ totalAmount, currency, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4">
          Your total amount is{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
          }).format(totalAmount)}
        </h3>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CheckoutDialog;
