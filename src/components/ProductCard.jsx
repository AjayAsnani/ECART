import React from "react";

const ProductCard = ({
  product,
  isInCart,
  onAddToCart,
  currencyFormat = "INR",
}) => {
  const handleAddToCart = () => {
    if (!isInCart) {
      onAddToCart();
    }
  };

  const validCurrencyFormat = ["INR", "USD", "EUR", "JPY", "GBP"].includes(
    currencyFormat
  )
    ? currencyFormat
    : "INR";

  return (
    <div className="border rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-between">
      <img
        src={product.image}
        alt={product.name}
        className=" mb-4 rounded transition-transform transform hover:scale-110 duration-300 ease-in-out w-auto h-60 md:h-72 object-cover"
      />
      <h3 className="text-lg font-semibold mb-2 text-center">{product.name}</h3>
      <p className="text-base text-center mb-2">{product.description}</p>
      <p className="text-gray-600 mb-4 font-bold text-center">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: validCurrencyFormat,
        }).format(product.price)}
      </p>
      <button
        onClick={handleAddToCart}
        className={`${
          isInCart ? "bg-green-500" : "bg-blue-500"
        } text-white py-2 px-4 rounded hover:bg-blue-600`}
        disabled={isInCart}
      >
        {isInCart ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
