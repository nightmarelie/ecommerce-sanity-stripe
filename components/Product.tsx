import React, { FC } from "react";

export type Props = {
  image: any;
  name: "string";
  slug: "string";
  price: number;
  details: string;
};

export const Product: FC<Props> = ({ name }) => {
  return <div>{name}</div>;
};
