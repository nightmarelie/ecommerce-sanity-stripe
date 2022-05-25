import React, { FC } from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

export type Props = {
  _id: string;
  image: any[];
  name: "string";
  slug: { current: "string" };
  price: number;
  details: string;
  quantity: number;
};

export const Product: FC<Props> = ({ name, slug, image, price }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};
