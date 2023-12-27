import React from "react";
import "./AboutText.css";
import logo from "../../img/logo.png";

export const About = () => {
  return (
    <div className="aboutDesign">
      <div className="aboutDiv">
          <img className="aboutLogo" src={logo} />
          <div className="textAbout">
            <p>
              <span className="colourText-green">
                Welcome to our Trading Bot interface
              </span>
              , where automation meets profitability to create successful trading strategies. We take pride in{" "}
              <span className="colourText-green">combining </span>advanced algorithms
              with real-time market data to provide our users with a{" "}
              <span className="colourText-green">powerful toolset.</span>
            </p>
            <p>
              <span className="colourText-green" id="head">Our Philosophy:</span>
            </p>
            <p>
              At <span className="colourText-green">Trading Bot</span>, we believe in leveraging technology to optimize trading performance. Our platform is designed to empower traders with{" "}
              <span className="colourText-green">efficiency</span> and <span className="colourText-green">accuracy</span>, enabling them to make informed decisions and achieve their financial goals.
            </p>
          </div>
        </div>
        <div className="colums">
          <div className="nextText">
            <p>
              <span className="colourText-green" id="head">Our Team:</span>
              </p>
              <p>
              Our team consists of <span className="colourText-green">experienced</span> and <span className="colourText-green">knowledgeable professionals</span> who specialize in algorithmic trading and financial markets. Each member is committed to providing <span className="colourText-green">exceptional support</span> and helping our users succeed in their trading endeavors.
            </p>
          </div>
          <div className="nextText">
            <p>
            <span className="colourText-green" id="head">User-Friendly Interface:</span>
            </p>
            <p>
            Our interface is designed to be intuitive and user-friendly, making it easy for traders of all levels to navigate and utilize our trading bot effectively. We prioritize simplicity without compromising on functionality.
            </p>
          </div>
        </div>
        <div className="colums">
          <div className="nextText">
            <p>
              <span className="colourText-green" id="head">Advanced Trading Strategies:</span>
              </p>
              <p>
              Our trading bot incorporates advanced strategies and indicators to maximize profitability and minimize risk. From trend following to mean reversion, we offer a wide range of strategies to suit different market conditions and trading preferences.
            </p>
          </div>
          <div className="nextText">
            <p>
            <span className="colourText-green" id="head">Reliable Performance:</span>
            </p>
            <p>
            <span className="colourText-green">Reliability</span> is our top priority. Our trading bot is built with robust architecture and undergoes rigorous testing to ensure stable and consistent performance. We strive to provide our users with a reliable tool they can trust for their trading activities.
            </p>
          </div>
      </div>
    </div>
  );
};
