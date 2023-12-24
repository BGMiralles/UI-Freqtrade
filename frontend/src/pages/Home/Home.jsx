import React from "react";
import "./Home.css";
import { Banner } from "../../common/BannerHome/BannerHome";
import { AboutUs } from "../../common/AboutUs/AboutUs";
import { FlipCards } from "../../common/FlipsCards/FlipsCards";
import { Information } from "../../common/Information/Information";

export const Home = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <FlipCards />
      <Information />
    </div>
  );
};
