import React from 'react'
import {useNavigate, Navigate } from 'react-router-dom';
import Bitcoin from "../../assets/bitcoin.png";
import Etherium from "../../assets/etherium.png";



function CryptoSec() {

  const navigate = useNavigate();
  return (
    
      <div
        onClick={() => {
         navigate("/crypto");
        }}
        className="CryptoSec d-flex flex-column mx-auto"
      >
        <div className="crypto-imgs d-flex flex-row ">
          <img id="img1" src={Bitcoin} alt="" />
          <img id="img2" src={Etherium} alt="" />
        </div>
      <header>Crypto</header>
      <p data-testid='cryptoDesc'>
        You can analyse the real time crypto curerncies in time frames. This
        website allows you to view the crypto price variations in candle stick
        charts
      </p>
      <span >Click to analyse</span>
    </div>
  );
}

export default CryptoSec
