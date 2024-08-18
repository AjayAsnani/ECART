import React, { useState } from "react";

const Sidebar = ({
  filterByCategory,
  selectedCategory,
  onCurrencyChange,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState("INR");

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setSelectedCurrency(newCurrency);
    onCurrencyChange(newCurrency);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-72 bg-gray-100 border-r border-gray-400 p-4 shadow-lg transition-transform duration-300 ease-in-out z-40 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 md:w-64 md:block`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 md:hidden bg-blue-500 text-white py-2 px-4 rounded shadow-lg z-50"
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      <h2 className="text-2xl font-bold mb-4 lg:text-center">Categories</h2>
      <ul>
        {[
          "All Categories",
          "Electronics",
          "Accessories",
          "Audio",
          "Wearables",
        ].map((category) => (
          <li
            key={category}
            className={`mb-2 cursor-pointer hover:text-blue-500 ${
              selectedCategory === category ? "text-blue-500 font-bold" : ""
            }`}
            onClick={() =>
              filterByCategory(category === "All Categories" ? "" : category)
            }
          >
            {category}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <label
          htmlFor="currency"
          className="text-center block text-lg font-bold mb-2"
        >
          Select Currency
        </label>
        <select
          id="currency"
          className="p-2 border rounded w-full"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          <option value="INR">INR - Indian Rupee</option>
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="GBP">GBP - British Pound</option>
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
