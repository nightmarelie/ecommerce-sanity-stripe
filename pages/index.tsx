import React, { FC } from "react";
import { HeroBanner, Product, Footer, ProductProps } from "../components";

import { client } from "../lib/client";

type Props = {
  products: ProductProps[];
  banners: any[];
};

const Home: FC<Props> = ({ products, banners }) => {
  return (
    <>
      <HeroBanner {...(banners[0] ?? {})} />
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
  const products = await client.fetch("*[_type == 'product']");
  const banners = await client.fetch("*[_type == 'banner']");

  return {
    props: {
      products,
      banners,
    },
  };
};

export default Home;
