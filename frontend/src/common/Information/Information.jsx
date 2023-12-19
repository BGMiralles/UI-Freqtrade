import React from "react";
import "./Information.css";

export const Information = () => {
  return (
    <div>
      <div className="informationDiv">
        <div className="informationText">
          ADRESS
          <span className="informationTextUnder">C/ dels Centelles, 34</span>
          <span className="informationTextUnder">46006 Valencia</span>
        </div>
        <div className="informationText">
          CONTACT
          <a href="https://www.instagram.com/rocket_tattoo_ruzafa/">
            <img className="IgLogo" src={"../src/img/logo-ig.png"} alt="Logo" />
          </a>
        </div>
        <div className="informationText">
          SCHEDULE
          <span className="informationTextUnder">
            Tuesday to Fryday 10:00 - 21:00
          </span>
          <span className="informationTextUnder">Saturday 10:00 - 16:00</span>
        </div>
      </div>
    </div>
  );
};
