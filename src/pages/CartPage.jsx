import React, { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";
import CartItem from "../components/CartItem";
import CheckoutDialog from "../components/CheckoutDialog";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    currency,
    calculateSubtotal,
    calculateTotalWithDiscount,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const subtotal = calculateSubtotal();
  const totalWithDiscount = calculateTotalWithDiscount();

  const [showDialog, setShowDialog] = useState(false);

  const goToHome = () => {
    navigate("/");
  };

  const handleCheckout = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-xl">
          Your cart is empty. <br />
          <button
            onClick={goToHome}
            className="bg-blue-500 text-white py-2 mt-4 px-4 rounded hover:bg-green-600"
          >
            Shop Now
          </button>
        </p>
      ) : (
        <div className="w-full max-w-3xl">
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                product={item}
                removeFromCart={() => removeFromCart(item.id)}
              />
            ))}
          </div>
          <div className="border-t border-gray-300 mt-4 pt-4 text-center">
            <button
              onClick={goToHome}
              className="bg-blue-500 text-white py-2 mt-4 px-4 rounded hover:bg-green-600 mb-6"
            >
              Continue Shopping
            </button>
            <h3 className="text-xl font-bold">Cart Summary</h3>
            <div className="flex justify-between mt-2 w-full max-w-xs mx-auto">
              <span>Subtotal:</span>
              <span className="font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency,
                }).format(subtotal)}
              </span>
            </div>
            <div className="flex justify-between mt-2 w-full max-w-xs mx-auto">
              <span>Discount (10% off):</span>
              <span className="font-bold">
                -
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency,
                }).format(subtotal - totalWithDiscount)}
              </span>
            </div>
            <div className="flex justify-between mt-2 w-full max-w-xs mx-auto">
              <span>Total:</span>
              <span className="font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency,
                }).format(totalWithDiscount)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white py-2 mt-6 px-4 rounded hover:bg-green-600 "
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {showDialog && (
        <CheckoutDialog
          totalAmount={totalWithDiscount}
          currency={currency}
          onClose={closeDialog}
        />
      )}
    </div>
  );
};

export default CartPage;
