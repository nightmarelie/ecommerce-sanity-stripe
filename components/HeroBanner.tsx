import React, { FC } from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

export type Props = {
  image: any;
  buttonText: "string";
  product: "string";
  desc: "string";
  smallText: "string";
  midText: "string";
  largeText1: "string";
  largeText2: "string";
  discount: "string";
  saleTime: "string";
};

export const HeroBanner: FC<Props> = ({
  image,
  smallText,
  buttonText,
  largeText1,
  product,
  midText,
  desc,
}) => {
  return (
    <div className="hero-banner-container">
      <div className="beats-solo">{smallText}</div>
      <h3>{midText}</h3>
      <h1>{largeText1}</h1>
      <img src={urlFor(image)} alt="Headphones" className="hero-banner-image" />
      <div>
        <Link href={`/product/${product}`}>
          <button>{buttonText}</button>
        </Link>
      </div>
      <div className="desc">
        <h5>Description</h5>
        <p>{desc}</p>
      </div>
    </div>
  );
};
