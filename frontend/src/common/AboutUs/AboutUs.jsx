import React from "react";
import "./AboutUs.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="aboutUsDesign">
      <div className="aboutUsDiv">
        <img className="aboutUsLogo" src="../src/img/logo.png" alt="Logo" />
        <div className="textAboutUs">
          <p>
            <span className="colourText-green">
              Welcome to our Freqtrade UI
            </span>
            , where automation meets profitability to create successful trading strategies
            in the financial markets. We take pride in{" "}
            <span className="colourText-green">combining </span>advanced algorithms
            with real-time data to make informed trading decisions,
            providing our users with a{" "}
            <span className="colourText-green">powerful toolset </span>
          </p>
          <div className="buttonBookDiv">
            <Button className="appointmentAboutUs" onClick={()=> navigate("/about")}>About Us</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
