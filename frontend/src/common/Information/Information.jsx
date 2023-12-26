import React from "react";
import "./Information.css";
import logoIg from "../../img/logo-ig.png";

export const Information = () => {
  return (
    <div>
      <div className="informationDiv">
        <div className="informationText">
          CONTACT
          <a href="https://www.instagram.com/bgmiralles/">
            <img className="IgLogo" src={logoIg} alt="Logo" />
          </a>
        </div>
      </div>
    </div>
  );
};
