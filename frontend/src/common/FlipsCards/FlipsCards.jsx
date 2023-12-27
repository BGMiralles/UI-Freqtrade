import React, { useState } from "react";
import "./FlipsCards.css";
import texto1 from "../../img/texto-1.png";
import texto2 from "../../img/texto-2.png";
import strategy1 from "../../img/strategy.png";
import strategy2 from "../../img/strategy2.png";

export const FlipCards = () => {
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
                isFlipped1 ? texto1 : strategy1
              }
              alt={`Tattoo ${isFlipped1 ? "1B" : "1A"}`}
            />
          </div>
          <div
            className={`image-wrapper ajust ${isFlipped2 ? "flipped" : ""}`}
            onClick={handleFlip2}
          >
            <img
              className="image-tattoo"
              src={
                isFlipped2 ? texto2 : strategy2
              }
              alt={`Tattoo ${isFlipped2 ? "2B" : "2A"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
