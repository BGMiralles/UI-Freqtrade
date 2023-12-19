import React, { useState } from "react";
import "./FlipCardData.css";

export const FlipCardData = ({ photo, name, description, price }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleFlip}
      style={{ marginBottom: "35em" }}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={photo} alt={name} />
        </div>
        <div className="flip-card-back">
          <div>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{`Price: ${price}€`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
