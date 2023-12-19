import React from "react";
import "./AboutText.css";

export const About = () => {
  return (
    <div className="aboutDesign">
      <div className="aboutDiv">
        <img className="aboutLogo" src="../src/img/logo.png" alt="Logo" />
        <div className="textAbout">
          <p>
            <span className="colourText">
              Welcome to our Rocket Tattoo studio
            </span>
            , where tradition meets innovation to create timeless masterpieces
            on the skin. We take pride in{" "}
            <span className="colourText">blending </span>the classic aesthetics
            of <span className="colourText"> Old School </span>with a modern and
            fresh touch, providing our clients with a{" "}
            <span className="colourText">unique experience.</span>
          </p>
          <p>
            <span className="colourText" id="head">Our Philosophy:</span>
          </p>
          <p>
            At <span className="colourText">Rocket Tattoo</span>, we celebrate
            the rich history of <span className="colourText">tattoo art</span>,
            infusing it with <span className="colourText">creativity</span> and{" "}
            <span className="colourText">passion</span> to bring your ideas to
            life in an authentic and personalized way. Each tattoo is a story,
            and we are dedicated to making your narrative permanent.
          </p>
        </div>
      </div>
      <div className="colums">
        <div className="nextText">
          <p>
            <span className="colourText" id="head">Our Team:</span>
            </p>
            <p>
            Our team consists of <span className="colourText">passionate</span> and <span className="colourText">highly skilled artists</span> who master both the <span className="colourText">classic techniques</span> of tattooing and the <span className="colourText">latest contemporary trends</span>. Each member is committed to providing <span className="colourText">exceptional service</span> and delivering stunning results.
          </p>
        </div>
        <div className="nextText">
          <p>
          <span className="colourText" id="head">Unique Atmosphere:</span>
          </p>
          <p>
          Step into a warm and inviting atmosphere at <span className="colourText">Rocket Tattoo Studio</span>. We've created a space where you can comfortably express your creativity, trusting our artists to transform your ideas into <span className="colourText">lasting works of art.</span>
          </p>
        </div>
      </div>
      <div className="colums">
        <div className="nextText">
          <p>
            <span className="colourText" id="head">Rocket Tattoo Style:</span>
            </p>
            <p>
            Our approach at <span className="colourText">Rocket Tattoo</span> blends classic and modern elements. From iconic symbols to contemporary designs, including <span className="colourText">animals</span>, <span className="colourText">landscapes</span>, and <span className="colourText">custom artwork</span>, we offer a diverse range of styles to suit every taste.
          </p>
        </div>
        <div className="nextText">
          <p>
          <span className="colourText" id="head">Commitment to Quality:</span>
          </p>
          <p>
          <span className="colourText">Quality</span> is our foremost priority. We use state-of-the-art equipment and materials while adhering to <span className="colourText">strict hygiene standards</span> to ensure the <span className="colourText">safety</span> and <span className="colourText">satisfaction</span> of our clients in <span className="colourText">every tattoo session</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
