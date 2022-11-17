import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Stock1 from "../../assets/stock1.png";
import Stock2 from "../../assets/stock2.png";
 
function StockSec() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/stock");
      }}
      className="CryptoSec d-flex flex-column mx-auto"
    >
      <div className="stock-imgs d-flex flex-row ">
        <img id="img1" src={Stock1} alt="" />
        <img id="img2" src={Stock2} alt="" />
      </div>
      <header style={{ marginTop: "10px" }}>Stock</header>
      <p data-testid="stockDes">
        View the stock market price variations and analyse them in time frames.
        Make back testing easier with candlestick charts
      </p>
      <span>Click to analyse</span>
    </div>
  );
}

export default StockSec;
