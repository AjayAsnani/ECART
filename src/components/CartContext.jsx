import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [currency, setCurrency] = useState("INR");
  const [exchangeRates, setExchangeRates] = useState({ INR: 1 });

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/INR")
      .then((response) => response.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const convertPrice = (price) => {
    return price * (exchangeRates[currency] || 1);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + convertPrice(item.price) * item.quantity,
      0
    );
  };

  const calculateDiscount = (amount, discountPercentage) => {
    return amount - (amount * discountPercentage) / 100;
  };

  const calculateTotalWithDiscount = () => {
    const subtotal = calculateSubtotal();
    return calculateDiscount(subtotal, 10);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        currency,
        changeCurrency,
        convertPrice,
        calculateSubtotal,
        calculateTotalWithDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
