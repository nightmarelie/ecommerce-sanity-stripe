import React from "react";
import { HeroBanner, Product, Footer } from "../components";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {["product 1", "product 2"].map((p, idx) => (
          <Product key={idx} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
