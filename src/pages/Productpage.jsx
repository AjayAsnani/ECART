import React from "react";
import ProductList from "../components/ProductList";

const Productpage = ({ currency }) => {
  return (
    <div className="min-h-screen ">
      <ProductList currency={currency} />
    </div>
  );
};

export default Productpage;
