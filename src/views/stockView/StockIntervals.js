import React from 'react'
import IndicatorMenuOne from "../../components/indicators/IndicatorMenuOne"
import IndicatorMenuTwo from "../../components/indicators/IndicatorMenuTwo"
import ChartTypes from "../../components/chartType/ChartType";

function StockIntervals({ changeInterval, addInternalIndicators, addExternalIndicators }) {
  const intervals = ["5m", "1h", "1d"];

  const handleClick = (interval) => {
    changeInterval(interval);
  };

  const displayInternalIndicators = (indicators) => {
    addInternalIndicators(indicators);
  };

  const displayExternalIndicators = (indicators) => {
    addExternalIndicators(indicators);
  };

  return (
    <div className="CryptoIntervals crypto-bar">
      <ChartTypes />
      <div className="d-flex flex-row justify-content-evenly">
        <IndicatorMenuOne
          displayInternalIndicators={displayInternalIndicators}
        />
        <IndicatorMenuTwo
          displayExternalIndicators={displayExternalIndicators}
        />
      </div>
      <div className="d-flex flex-row justify content-center">
        <header>Time interval</header>
        <div className="interval-btns">
          {intervals.map((interval) => {
            return (
              <div key={interval}>
                <button
                  type="button"
                  className="interval-btn"
                  onClick={() => {
                    handleClick(interval);
                  }}
                >
                  {interval}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StockIntervals
