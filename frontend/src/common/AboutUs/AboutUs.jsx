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
            <span className="colourText">
              Welcome to our Rocket Tattoo studio
            </span>
            , where tradition meets innovation to create timeless masterpieces
            on the skin. We take pride in{" "}
            <span className="colourText">blending </span>the classic aesthetics
            of <span className="colourText"> Old School </span>with a modern and
            fresh touch, providing our clients with a{" "}
            <span className="colourText">unique experience </span>
          </p>
          <div className="buttonBookDiv">
            <Button className="appointmentAboutUs" onClick={()=> navigate("/about")}>About Us</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
