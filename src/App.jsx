import React from "react";
import Productpage from "./pages/Productpage";
import CartPage from "./pages/CartPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Productpage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
