import Link from "next/link";
import React from "react";

export const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div className="beats-solo">HeroBanner</div>
      <h3>Mid text</h3>
      <img src="" alt="Headphones" className="hero-banner-image" />
      <div>
        <Link href="/product/ID">
          <button>Button Text</button>
        </Link>
      </div>
      <div className="desc">
        <h5>Description</h5>
        <p>Description</p>
      </div>
    </div>
  );
};
