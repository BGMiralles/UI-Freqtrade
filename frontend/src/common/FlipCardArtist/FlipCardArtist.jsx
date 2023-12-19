import React, { useState } from "react";
import "./FlipCardArtist.css";

export const FlipCardArtist = ({ tattoo_artist, description, photo }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={photo} alt={tattoo_artist} />
        </div>
        <div className="flip-card-back">
          <div>
            <h2>{tattoo_artist}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
