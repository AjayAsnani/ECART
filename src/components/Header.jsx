import React from "react";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ cartItems, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="bg-[#2874f0] text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <button
          className="md:hidden text-white text-2xl mr-3"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <h1 className="text-2xl font-bold">ECART</h1>

        <div className="relative flex-1 mx-4">
          <input
            type="text"
            className="hidden md:block p-2 pl-10 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="Search for products..."
          />

          <FaSearch className="md:hidden absolute top-3 left-3 text-gray-400 text-xl" />
          <input
            type="text"
            className="md:hidden p-2 pl-10 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
            placeholder="Search"
          />
        </div>

        <div className="relative">
          <button
            className="flex items-center space-x-1 cursor-pointer"
            onClick={handleCartClick}
          >
            <FaShoppingCart className="text-2xl" />
          </button>

          {cartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
