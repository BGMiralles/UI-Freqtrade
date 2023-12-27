import React from "react";
import "./BannerHome.css";
import logo from "../../img/logo.png";
import home from "../../img/home.png";

export const Banner = () => {
  return (
    <div className="bannerHeader">
      <div
        className="background-banner"
        style={{ backgroundImage: `url(${home})` }}
      >
        <div className="logo-container">
          <img className="logoPage" src={logo} alt="logoPage" />
        </div>
      </div>
    </div>
  );
};
