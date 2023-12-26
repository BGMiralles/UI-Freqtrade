import React, { useState } from "react";
import "./FlipsCards.css";

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
                isFlipped1 ? "./src/img/texto-1.JPG" : "./src/img/strategy.JPG"
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
                isFlipped2 ? "./src/img/texto-2.JPG" : "./src/img/strategy2.JPG"
              }
              alt={`Tattoo ${isFlipped2 ? "2B" : "2A"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
