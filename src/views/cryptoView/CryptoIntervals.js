import React from "react";
import IndicatorMenuOne from "../../components/indicators/IndicatorMenuOne";
import IndicatorMenuTwo from "../../components/indicators/IndicatorMenuTwo";
import ChartTypes from "../../components/chartType/ChartType";

function CryptoIntervals({
  changeInterval,
  addInternalIndicators,
  addExternalIndicators,
}) {
  const intervals = ["1m", "5m", "30m", "1h", "1d"];

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
    <div
      className="CryptoIntervals crypto-bar crypto-only-intervals"
      data-cy="test-crypto-interval"
    >
      <div className="d-flex flex-row justify content-center align-items-center">
        <header className="crypto-stock-charts ">Charts</header>
        <ChartTypes />
      </div>
      <div className="d-flex flex-row justify-content-evenly align-items-center">
        <header className="indicator-title">Indicators</header>
        <IndicatorMenuOne
          // //cypress test id for internal indicators
          // data-cy="test-internal-indicators"
          displayInternalIndicators={displayInternalIndicators}
        />
        <IndicatorMenuTwo
          // //cypress test id for external indicators
          // data-cy="test-external-indicators"
          displayExternalIndicators={displayExternalIndicators}
        />
      </div>
      <div className="d-flex flex-row justify content-center">
        <header>Time interval</header>
        <div className="interval-btns">
          {intervals.map((interval) => {
            return (
              <button
                type="button"
                className={" interval-btn "}
                onClick={() => {
                  handleClick(interval);
                }}
                key={interval}
              >
                {interval}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CryptoIntervals;
