import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSM Headphones</Link>
      </p>

      <button type="button" className="cart-icon" onClick={() => null}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{1}</span>
      </button>
    </div>
  );
};
