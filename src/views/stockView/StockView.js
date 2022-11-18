import React, { useState } from "react";
import HeaderTwo from "../../components/headers/HeaderTwo";
import StockHeader from "./StockHeader";
import StockIntervals from "./StockIntervals";
import StockChart from "./StockChart";
import StockTypes from "./StockTypes";
import LineChart from "../../components/technicalIndicators/lineChart";
import MACDChart from "../../components/technicalIndicators/macdChart";
import StochChart from "../../components/technicalIndicators/stochChart";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStockChartData,
  updateStockDataLimit,
  updateStockTimeStamp,
  updateIndicatorData,
} from "../../redux/chart";
// import PageLoader from "../../components/pageLoader/PageLoader";
import {
  resetInternalIndicators,
  resetExternalIndicatorData,
} from "../../utils/functions";
import Fade from "react-reveal/Fade";

function StockView() {

  const dispatch = useDispatch();
  const { stockChartDataLength } = useSelector((state) => state.chart);
  const [market, setMarket] = useState("");
  const [interval, setInterval] = useState("");
  const [internalIndicators, setInternalIndicators] = useState({
    ma: false,
    sma: false,
    ema: false,
    wma: false,
    bbands: false,
  });
  const [externalIndicators, setExternlIndicators] = useState({
    macd: false,
    obv: false,
    roc: false,
    rsi: false,
    stoch: false,
  });

  const changeStockType = (marketType) => {
    setMarket(marketType);
    dispatch(
      updateStockChartData({
        stockChartData: [],
        stockVolumeData: [],
      })
    );
    dispatch(updateStockDataLimit(280));
    dispatch(updateStockTimeStamp(0));
    resetExternalIndicatorData(dispatch);
    resetInternalIndicators(dispatch);
  };
  const changeInterval = (interval) => {
    setInterval(interval);
    dispatch(
      updateStockChartData({
        stockChartData: [],
        stockVolumeData: [],
      })
    );
    dispatch(updateStockDataLimit(280));
    dispatch(updateStockTimeStamp(0));
    resetExternalIndicatorData(dispatch);
    resetInternalIndicators(dispatch);
  };
  const addInternalIndicators = (indicators) => {
    setInternalIndicators(indicators);
    dispatch(updateStockDataLimit(stockChartDataLength));
    dispatch(updateStockTimeStamp(0));
  };
  const addExternalIndicators = (indicators) => {
    setExternlIndicators(indicators);
    dispatch(updateStockDataLimit(stockChartDataLength));
    dispatch(updateStockTimeStamp(0));
  };

  const { macd, obv, roc, rsi, stoch } = externalIndicators;

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
  
      <div className="CryptoView">
        <Fade top><HeaderTwo /></Fade>
        <div className="d-flex flex-row">
          <div className="crypto-charts d-flex flex-column">
            <Fade right duration={1000} ><StockHeader market={market} interval={interval} /></Fade>
            <Fade left duration={1000} delay={600}>
            <StockIntervals
              changeInterval={changeInterval}
              addInternalIndicators={addInternalIndicators}
              addExternalIndicators={addExternalIndicators}
            />
            </Fade>
            <StockChart
              market={market}
              interval={interval}
              internalIndicators={internalIndicators}
            />

            {rsi && ( <LineChart marketType="stock" market={market} interval={interval} type="rsi"/>)}
            {obv && ( <LineChart marketType="stock" market={market} interval={interval} type="obv"/>)}
            {roc && ( <LineChart marketType="stock" market={market} interval={interval} type="roc"/>)}
            {macd && ( <MACDChart marketType="stock" market={market} interval={interval} /> )}
            {stoch && ( <StochChart marketType="stock" market={market} interval={interval} />)}
          </div>
          <div className="types-crypto">
            <Fade duration={1000} delay={1500}>
            <StockTypes changeStockType={changeStockType} />
            </Fade>
          </div>
        </div>
      </div>

  );
}

export default StockView;
