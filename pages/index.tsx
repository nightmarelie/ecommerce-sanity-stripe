import React from "react";

const Home = () => {
  return (
    <>
      HeroBanner
      <div>
        <h2>Best selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div>{["product 1", "product 2"].map((p) => p)}</div>
    </>
  );
};

export default Home;
