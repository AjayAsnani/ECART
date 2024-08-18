import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { CartContext } from "./CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [exchangeRates, setExchangeRates] = useState({ INR: 1 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { addToCart, cartItems, currency, changeCurrency } =
    useContext(CartContext);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));

    fetch("https://api.exchangerate-api.com/v4/latest/INR")
      .then((response) => response.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, []);

  const filterByCategory = (category) => {
    if (category === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
    setSelectedCategory(category);
  };

  const handleCurrencyChange = (newCurrency) => {
    changeCurrency(newCurrency);
  };

  const convertPrice = (price) => {
    return price * (exchangeRates[currency] || 1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header cartItems={cartItems.length} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          filterByCategory={filterByCategory}
          selectedCategory={selectedCategory}
          onCurrencyChange={handleCurrencyChange}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Main content */}
        <main
          className={`flex-1 overflow-y-auto p-4 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "md:ml-64" : "md:ml-0"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{ ...product, price: convertPrice(product.price) }}
                isInCart={cartItems.some((item) => item.id === product.id)}
                onAddToCart={() => addToCart(product)}
                currencyFormat={currency}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductList;
