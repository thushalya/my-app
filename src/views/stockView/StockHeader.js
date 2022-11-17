import React from 'react'
import {useLocation} from "react-router-dom"

function StockHeader({market,interval}) {

  const location = useLocation();

   const marketState = "TSLA";


  var intervalState = location?.state?.interval || "5m";
  return (
    <div>
      <div className="CryptoHeader crypto-bar stock-header">
        <header>{market || marketState} - <span>{interval || intervalState}</span></header>
      </div>
    </div>
  );
}

export default StockHeader
