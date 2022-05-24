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

export const FooterBanner: FC<Props> = ({
  discount,
  largeText1,
  largeText2,
  saleTime,
  smallText,
  midText,
  desc,
  product,
  buttonText,
  image,
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <img src={urlFor(image)} className="footer-banner-image" />
      </div>
    </div>
  );
};
