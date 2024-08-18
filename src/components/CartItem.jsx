import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ product, removeFromCart }) => {
  const { currency, convertPrice, updateQuantity } = useContext(CartContext);

  const increaseQuantity = () => {
    updateQuantity(product.id, product.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1);
    }
  };

  return (
    <div className="border rounded-lg shadow-lg p-4 flex justify-between items-center flex-wrap">
      <div className="flex items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-cover rounded mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency,
            }).format(convertPrice(product.price))}
          </p>
          <div className="flex items-center mt-2">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-200 text-gray-700 py-1 px-2 rounded-l hover:bg-gray-300"
            >
              -
            </button>
            <span className="w-16 text-center border-t border-b">
              {product.quantity}
            </span>
            <button
              onClick={increaseQuantity}
              className="bg-gray-200 text-gray-700 py-1 px-2 rounded-r hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={() => removeFromCart(product.id)}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
