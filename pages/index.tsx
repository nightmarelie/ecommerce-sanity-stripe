import React, { FC } from "react";
import { HeroBanner, Product, Footer } from "../components";

import { client } from "../lib/client";

type Props = {
  products: any[];
};

const Home: FC<Props> = ({ products }) => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products.map((p, idx) => (
          <Product key={idx} {...p} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = "*[_type == 'product']";

  const products = await client.fetch(query);

  return {
    props: {
      products,
    },
  };
};

export default Home;
