import React from "react";
import "./Home.css";
import { Banner } from "../../common/BannerHome/BannerHome";
import { AboutUs } from "../../common/AboutUs/AboutUs";
import { TattooStyles } from "../../common/TattooStyles/TattooStyles";
import { Information } from "../../common/Information/Information";

export const Home = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <TattooStyles />
      <Information />
    </div>
  );
};
