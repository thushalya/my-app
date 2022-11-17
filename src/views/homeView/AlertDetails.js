import React from 'react'
import CustomizeIcon from "../../assets/customize.png";
import Slide from "react-reveal/Slide";

function AlertDetails() {
  return (
    <div className="AlertDetails d-flex flex-row justify-content-center">
      <Slide right>
        <div className="alert-details">
          <header>
            <span className="alert-details-1">Subscribe to </span>
            <span className="alert-details-2"> customizable alerts</span>
          </header>
          <p className="alert-p-1">Customizable alerts as required</p>
          <p className="alert-p-2">
            Get notifications when the price hits limits
          </p>
          <p className="alert-p-3">The platform where trading becomes easier</p>
        </div>
      </Slide>
      <Slide left>
        <div className="alert-img-sec">
          <img src={CustomizeIcon} alt="" />
        </div>
      </Slide>
    </div>
  );
}

export default AlertDetails
