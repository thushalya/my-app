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
import PageLoader from "../../components/pageLoader/PageLoader";

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
    dispatch(updateIndicatorData({ indicatorType: "ma", data: [] }));
    dispatch(updateIndicatorData({ indicatorType: "sma", data: [] }));
    dispatch(updateIndicatorData({ indicatorType: "wma", data: [] }));
    dispatch(updateIndicatorData({ indicatorType: "ema", data: [] }));
    dispatch(
      updateIndicatorData({
        indicatorType: "bbands",
        data: { upper: [], middle: [], lower: [] },
      })
    );
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
    dispatch(updateIndicatorData({ indicatorType: "ma", data: [] }));
    dispatch(updateIndicatorData({ indicatorType: "sma", data: [] }));
    dispatch(updateIndicatorData({ indicatorType: "wma", data: [] }));
    dispatch(updateIndicatorData({ indicatorType: "ema", data: [] }));
    dispatch(
      updateIndicatorData({
        indicatorType: "bbands",
        data: { upper: [], middle: [], lower: [] },
      })
    );
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
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="CryptoView">
          <HeaderTwo />
          <div className="d-flex flex-row">
            <div className="crypto-charts d-flex flex-column">
              <StockHeader market={market} interval={interval} />
              <StockIntervals
                changeInterval={changeInterval}
                addInternalIndicators={addInternalIndicators}
                addExternalIndicators={addExternalIndicators}
              />
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
              <StockTypes changeStockType={changeStockType} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockView;
