import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { removeDuplicates ,compare} from "../../utils/functions";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import config from "../../config.json";
import Loader from "../../components/loaders/chartLoader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCryptoDataLimit,
  updateCryptoTimeStamp,
  updateExternalIndicatorData,
  updateStockDataLimit,
  updateStockTimeStamp
} from "../../redux/chart";

function LineChart({
  marketType,
  market,
  interval,
  type
}) {

  const location = useLocation()

   const marketState = marketType=="crypto"? "BTC": "TSLA";

  var intervalState =
    location?.state?.interval || marketType == "crypto" ? "1m" : "5m";

  function getWindowDimension() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }
  const dispatch =useDispatch()
  const {
    cryptoChartDataLength,
    cryptoTimeStamp,
    cryptoDataLimit,
    externalIndicatorData,
    stockTimeStamp,
    stockDataLimit,
  } = useSelector((state) => state.chart);

  const ref = useRef();
  const chart = useRef();
  const lineSeries = useRef();
  const [loading, setLoading] = useState(false);

  const [visibleLogicalRange, setVisibleLogicalRange] = useState({});

  const timeStamp = marketType=="crypto"? cryptoTimeStamp:stockTimeStamp;
  const dataLimit = marketType=="crypto"? cryptoDataLimit:stockDataLimit;
  console.log("timestamp is ",timeStamp)

  useEffect(() => {
    setLoading(true);
    chart.current = createChart(ref.current, {
      width: 0,
      height: 0,
      layout: {
        backgroundColor: "#393C45",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
      },

      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    lineSeries.current = chart.current.addLineSeries({
      color: type == "rsi" ? "blue" : type == "obv" ? "#0C88D8" : "#06179C",
      lineWidth: 1.5,

      // lineType: 1
    });

    chart.current.applyOptions({
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: false,
      },
    });
    const url =
      `${config.DOMAIN_NAME}/${type}/${marketType}/` +
      `${market || marketState}/${
        interval || intervalState
      }/0/${dataLimit}`;
    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let tempLines = [];
        let tempTimeLine = [];
        console.log("raw data ", data);

        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            let object = {
              time: marketType == "crypto" ? Number(key) : Number(key) / 1000,
              value: data[key],
            };
            tempLines.push(object);
            tempTimeLine.push(object.time);
          }
        }
        console.log("heyyy timestamp 0");
        let tempLineData = removeDuplicates([
          ...tempLines,
          ...externalIndicatorData[type],
        ]).sort(compare);
        dispatch(
          updateExternalIndicatorData({
            indicatorType: type,
            data: tempLineData,
          })
        );
        console.log("external indicator data",externalIndicatorData[type])
        lineSeries.current.setData(tempLineData);

        setTimeout(()=>{
          setLoading(false)
        },2500)
      })
      .catch();

      function onVisibleLogicalRangeChanged(newVisibleLogicalRange) {
        setVisibleLogicalRange(newVisibleLogicalRange);
      }
      chart.current
        .timeScale()
        .subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged);

    return () => {
      chart.current.remove();
    };
  }, [market, interval]);

  useEffect(() => {
    const url =
      `${config.DOMAIN_NAME}/${type}/${marketType}/` +
      `${market || marketState}/${interval || intervalState}/${timeStamp}/${dataLimit}`;
    console.log(url);
    timeStamp!==0 &&
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          let tempLines = [];
          let tempTimeLine = [];

          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              let object = {
                time: marketType == "crypto" ? Number(key) : Number(key) / 1000,
                value: data[key],
              };
              tempLines.push(object);
              tempTimeLine.push(object.time);
            }
          }
          
          let tempLineData = removeDuplicates([
            ...tempLines,
            ...externalIndicatorData[type],
          ]).sort(compare);
          lineSeries.current.setData(tempLineData);
          dispatch(
            updateExternalIndicatorData({
              indicatorType: type,
              data: tempLineData,
            })
          );
          console.log("external indicator data", externalIndicatorData[type]);       
          setLoading(false);
        })
        .catch();
  }, [
    marketType == "crypto" ? cryptoTimeStamp : stockTimeStamp,
  ]);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimension()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimension());
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      // chart.current.resize(windowDimensions["width"] * 0.85, 380);
      const width = windowDimensions["width"];
       if (width >= 1460) chart.current.resize(1330, 200);
       if (width >= 1400 && width < 1460) chart.current.resize(1245, 200);
       if (width >= 1350 && width < 1400) chart.current.resize(1180, 200);
       if (width >= 1285 && width < 1350) chart.current.resize(1130, 200);
       if (width >= 1220 && width < 1285) chart.current.resize(1067, 200);
       if (width >= 1070 && width < 1220) chart.current.resize(930, 200);
       if (width >= 900 && width < 1070) chart.current.resize(800, 200);
       if (width >= 800 && width < 900) chart.current.resize(670, 200);
       if (width >= 650 && width < 800) chart.current.resize(540, 200);
       if (width >= 550 && width < 650) chart.current.resize(430, 200);
       if (width >= 478 && width < 550) chart.current.resize(380, 200);
       if (width >= 440 && width < 478) chart.current.resize(365, 200);
       if (width >= 400 && width < 440) chart.current.resize(325, 200);
       if (width < 400) chart.current.resize(280, 200);
    };
  });

  const loadPrevious = () => {
    if (visibleLogicalRange.from < 0) {
      let loadData = Math.ceil(Math.abs(visibleLogicalRange.from));
      if(marketType=="crypto"){
        dispatch(updateCryptoTimeStamp(cryptoTimeStamp + cryptoDataLimit));
        dispatch(updateCryptoDataLimit(loadData));
      }
      else{
        dispatch(updateStockTimeStamp(stockTimeStamp + stockDataLimit));
        dispatch(updateStockDataLimit(loadData));

      }
      
    }
  };

  return (
    <>
      {loading ? <Loader margin={65} /> : null}
      <div style={{display: loading ? "none" : "block"}}>
        <div className="d-flex flex-row">
          <div
            className="CryptoChart"
            ref={ref}
            onMouseUpCapture={loadPrevious}
            onTouchEnd={loadPrevious}
            style={{
              marginBottom: "-10px",
              marginLeft: "15px",
              marginRight: "20px",
            }}
          />
          <div>
            <Typography
              style={{
                margin: "0 auto",
                marginTop: "5rem",
                marginBottom: "-10px",
                color: "white",
                width: "fit-content",
              }}
              variant="h6"
            >
              {type.toUpperCase()}
            </Typography>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default LineChart;
