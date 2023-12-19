import React from "react";
import "./BannerHome.css";

export const Banner = () => {
  return (
    <div className="bannerHeader">
      <div
        className="background-banner"
        style={{ backgroundImage: `url('../src/img/home.jpg')` }}
      >
        <div className="logo-container">
          <img className="logoPage" src="../src/img/logo.png" alt="logoPage" />
        </div>
      </div>
    </div>
  );
};
