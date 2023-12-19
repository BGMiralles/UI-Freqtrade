import React, { useState } from "react";
import "./TattooStyles.css";

export const TattooStyles = () => {
  const [isFlipped1, setIsFlipped1] = useState(false);
  const [isFlipped2, setIsFlipped2] = useState(false);
  const [isFlipped3, setIsFlipped3] = useState(false);

  const handleFlip1 = () => {
    setIsFlipped1(!isFlipped1);
  };

  const handleFlip2 = () => {
    setIsFlipped2(!isFlipped2);
  };

  const handleFlip3 = () => {
    setIsFlipped3(!isFlipped3);
  };

  return (
    <div className="tattooStyles">
      <div
        className="background-banner stylesBanner"
        style={{ backgroundImage: `url('../../img/home-example.jpg')` }}
      >
        <div className="image-container">
          <div
            id="rockRoll"
            className={`image-wrapper ${isFlipped1 ? "flipped" : ""}`}
            onClick={handleFlip1}
          >
            <img
              className="image-tattoo"
              src={
                isFlipped1 ? "./src/img/tattoo1.jpg" : "./src/img/tattoo5.png"
              }
              alt={`Tattoo ${isFlipped1 ? "1B" : "1A"}`}
            />
          </div>
          <div
            className={`image-wrapper ${isFlipped2 ? "flipped" : ""}`}
            onClick={handleFlip2}
          >
            <img
              className="image-tattoo"
              src={
                isFlipped2 ? "./src/img/tattoo2.jpg" : "./src/img/tattoo4.jpg"
              }
              alt={`Tattoo ${isFlipped2 ? "2B" : "2A"}`}
            />
          </div>
          <div
            className={`image-wrapper ${isFlipped3 ? "flipped" : ""}`}
            onClick={handleFlip3}
          >
            <img
              className="image-tattoo"
              src={
                isFlipped3 ? "./src/img/tattoo3.jpg" : "./src/img/tattoo6.jpg"
              }
              alt={`Tattoo ${isFlipped3 ? "3B" : "3A"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
