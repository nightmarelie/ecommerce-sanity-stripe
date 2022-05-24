import React, { FC } from "react";

type Props = {
  image: any;
  name: "string";
  slug: "string";
  price: number;
  details: string;
};

export const Product: FC<Props> = ({ name }) => {
  return <div>{name}</div>;
};
