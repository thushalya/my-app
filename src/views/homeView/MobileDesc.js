import React from "react";
import Mobile from "../../assets/mobile.png";
import Fade from "react-reveal/Fade";

function MobileDesc() {
  return (
    <div className="mobileDesc">
      <Fade left >
        <div className="mobile-img-sec">
          <img src={Mobile} alt="" />
        </div>
      </Fade>
      <div className="mobile-descriptions">
        <Fade right delay={200}>
          <header>
            Explore crypto and stock market data with Crypstoxplorer in any
            place
          </header>
        </Fade>
        <Fade right delay={330} >
          <p>
            <span>Add to your</span>{" "}
            <span className="blue-keyword">home screen </span>
            <span>and use the web as your own</span>{" "}
            <span className="blue-keyword">mobile appplication</span>
          </p>
        </Fade>
      </div>
    </div>
  );
}

export default MobileDesc;
