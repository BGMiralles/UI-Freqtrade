import React, { useState } from "react";
import "./ArtistsCard.css";
import Angel from "../../img/Angelink.jpg";

export const ArtistsCards = () => {
  return (
    <div className="artists">
      <div className="card">
        <div>
          <img className="photo" src={Angel} alt="image" />
        </div>
        <div className="name">Angel Ink</div>
        <div className="text">
          Artista de la piel experto en transformar ideas en tinta. Creativo,
          hábil y apasionado por contar historias a través del arte del tatuaje.
        </div>
      </div>
      <div className="card">
        <div>
          <img className="photo" src={Angel} alt="image" />
        </div>
        <div className="name">Angel Ink</div>
        <div className="text">
          Artista de la piel experto en transformar ideas en tinta. Creativo,
          hábil y apasionado por contar historias a través del arte del tatuaje.
        </div>
      </div>
      <div className="card">
        <div>
          <img className="photo" src={Angel} alt="image" />
        </div>
        <div className="name">Angel Ink</div>
        <div className="text">
          Artista de la piel experto en transformar ideas en tinta. Creativo,
          hábil y apasionado por contar historias a través del arte del tatuaje.
        </div>
      </div>
      <div className="card">
        <div>
          <img className="photo" src={Angel} alt="image" />
        </div>
        <div className="name">Angel Ink</div>
        <div className="text">
          Artista de la piel experto en transformar ideas en tinta. Creativo,
          hábil y apasionado por contar historias a través del arte del tatuaje.
        </div>
      </div>
    </div>
  );
};
