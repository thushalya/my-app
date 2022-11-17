import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { removeDuplicates } from "../../utils/functions";
import { compare } from "../../utils/functions";
import { useLocation } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import config from "../../config.json";
import { getLineChart } from "../../components/technicalIndicators/lineSeries";
import { getBbandsChart } from "../../components/technicalIndicators/bbandsIndicator";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCryptoChartData,
  updateCryptoDataLimit,
  updateCryptoTimeStamp,
} from "../../redux/chart";
import { CANDLESTICK, LINE ,BAR} from "../../utils/Constants";

function CryptoChart({ market, interval, internalIndicators }) {
  const location = useLocation();
  try {
    var marketState = location.state.market;
  } catch (error) {
    marketState = "BTC";
  }
  var intervalState = location?.state?.interval || "1m";

  function getWindowDimension() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  const { ma, sma, ema, wma, bbands } = internalIndicators;

  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const chart = useRef();
  const candleSeries = useRef();
  const volumeSeries = useRef();
  const lineSeries = useRef();
  const barSeries = useRef();

  const smalineSeries = useRef();
  const wmalineSeries = useRef();
  const emalineSeries = useRef();
  const maLineSeries = useRef();
  const bbandLowerSeries = useRef();
  const bbandMiddleSeries = useRef();
  const bbandUpperSeries = useRef();

  const dispatch = useDispatch();

  const {
    cryptoChartData,
    cryptoChartDataLength,
    cryptoVolumeData,
    chartType,
    cryptoTimeStamp,
    cryptoDataLimit,
    internalIndicatorData,
  } = useSelector((state) => state.chart);

  const [visibleLogicalRange, setVisibleLogicalRange] = useState({});

  useEffect(() => {
    setLoading(true);
    console.log("charttt dataa", cryptoChartData);
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
    volumeSeries.current = chart.current.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.77,
        bottom: 0,
      },
    });
    chart.current.applyOptions({
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: false,
        autoScale: false,
        shiftVisibleRangeOnNewBar: true,
      },
      priceScale: {
        color: "black",
        lineWidth:20,
      },
    });
    let newCrypto =
      config.DOMAIN_NAME +
      "/history/" +
      `${market || marketState}/${
        interval || intervalState
      }/0/${cryptoDataLimit}`;
      fetch(newCrypto)
        .then((res) => res.json())
        .then((data) => {
          let tempCandlesticks = [];
          // let tempTimeLine = [];
          let tempVolume = [];
          data.data.forEach((row) => {
            let object = {
              time: row[0],
              open: row[1],
              high: row[2],
              low: row[3],
              close: row[4],
            };
            let volume = {
              time: row[0],
              value: row[5],
              color: row[1] > row[4] ? "#834C4B" : "#318B52",
            };
            // tempTimeLine.push(object.time);
            tempCandlesticks.push(object);
            tempVolume.push(volume);
          });
          let tempChartData = removeDuplicates([
            ...tempCandlesticks,
            ...cryptoChartData,
          ]).sort(compare);
          let tempVolumeData = removeDuplicates([
            ...tempVolume,
            ...cryptoVolumeData,
          ]).sort(compare);

          if (chartType == CANDLESTICK) {
            candleSeries.current = chart.current.addCandlestickSeries({
              upColor: "rgba(0,133,48,1)",
              downColor: "#851D1A",
              borderDownColor: "#851D1A",
              borderUpColor: "rgba(0,133,48,1)",
              wickDownColor: "#851D1A",
              wickUpColor: "rgba(0,133,48,1)",
            });
            candleSeries.current.applyOptions({
              scaleMargins: {
                top: 0.05,
                bottom: 0.17,
              },
            });
            candleSeries.current.setData(tempChartData);
          }

          if(chartType== LINE){
            lineSeries.current = chart.current.addLineSeries({
              lineWidth: 2.5,
              color: "#0F9FF7",
            });
            lineSeries.current.applyOptions({
              scaleMargins: {
                top: 0.05,
                bottom: 0.17,
              },
            });

            let tempLineData=[]
            tempChartData.forEach((obj)=>{
              let lineObject = {
                time : obj["time"],
                value : obj["close"],
              }
              tempLineData.push(lineObject)
            })
            lineSeries.current.setData(tempLineData);
          }
          if(chartType == BAR){
            barSeries.current = chart.current.addBarSeries({
              thinBars: false,
              downColor: "#A70808",
              upColor: "#129F01",
            });
            barSeries.current.applyOptions({
              scaleMargins: {
                top: 0.05,
                bottom: 0.17,
              },
            });
            barSeries.current.setData(tempChartData)
          }
          

          
          volumeSeries.current.setData(tempVolumeData);

          dispatch(
            updateCryptoChartData({
              cryptoChartData: tempChartData,
              cryptoVolumeData: tempVolumeData,
            })
          );
          setLoading(false);
        })
        .catch();

    let eventSource = new EventSource(
      `${config.DOMAIN_NAME}/present/` +
        `${market || marketState}/${interval || intervalState}`
    );
    eventSource.addEventListener("message", function (e) {
      let parsedData = JSON.parse(e.data);
      let object = {
        time: parsedData[0],
        open: parsedData[1],
        high: parsedData[2],
        low: parsedData[3],
        close: parsedData[4],
      };
      let LineObject = {
        time: parsedData[0],
        value: parsedData[4],
      };
       let volume = {
         time: parsedData[0],
         value: parsedData[5],
         color: parsedData[1] > parsedData[4] ? "#834C4B" : "#318B52",
       };

      if(chartType== CANDLESTICK) candleSeries.current.update(object);
      if(chartType ==LINE) lineSeries.current.update(LineObject);

      volumeSeries.current.update(volume);
    });


    if (ma) {
      maLineSeries.current = chart.current.addLineSeries({
        lineWidth: 1,
        title: "MA",
        color: "blue",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/ma/crypto/` +
          `${market || marketState}/${
            interval || intervalState
          }/0/${cryptoDataLimit}`,
        maLineSeries.current,
        "crypto",
        dispatch,
        internalIndicatorData.ma,
        "ma"
      );

      console.log("inidcator ma", internalIndicatorData.ma);
    }
    if (sma) {
      smalineSeries.current = chart.current.addLineSeries({
        lineWidth: 1,
        title: "SMA",
        color: "red",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/sma/crypto/` +
          `${market || marketState}/${
            interval || intervalState
          }/0/${cryptoDataLimit}`,
        smalineSeries.current,
        "crypto",
        dispatch,
        internalIndicatorData.sma,
        "sma"
      );
    }

    if (ema) {
      emalineSeries.current = chart.current.addLineSeries({
        lineWidth: 1,
        title: "EMA",
        color: "#0397EC",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/ema/crypto/` +
          `${market || marketState}/${
            interval || intervalState
          }/0/${cryptoDataLimit}`,
        emalineSeries.current,
        "crypto",
        dispatch,
        internalIndicatorData.ema,
        "ema"
      );
    }

    if (wma) {
      wmalineSeries.current = chart.current.addLineSeries({
        lineWidth: 1,
        title: "WMA",
        color: "#C5EC03",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/wma/crypto/` +
          `${market || marketState}/${
            interval || intervalState
          }/0/${cryptoDataLimit}`,
        wmalineSeries.current,
        "crypto",
        dispatch,
        internalIndicatorData.wma,
        "wma"
      );
    }
    if (bbands) {
      bbandUpperSeries.current = chart.current.addLineSeries({
        lineWidth: 1,
        title: "BBAND Upper",
        color: "#022875",
      });

      bbandMiddleSeries.current = chart.current.addLineSeries({
        lineWidth: 1,
        title: "BBAND Middle",
        color: "#0B3894",
      });

      bbandLowerSeries.current = chart.current.addLineSeries({
        lineWidth: 1,
        title: "BBAND Lower",
        color: "#022875",
      });

      getBbandsChart(
        `${config.DOMAIN_NAME}/bbands/crypto/` +
          `${market || marketState}/${
            interval || intervalState
          }/0/${cryptoDataLimit}`,
        bbandUpperSeries.current,
        bbandMiddleSeries.current,
        bbandLowerSeries.current,
        "crypto",
        dispatch,
        internalIndicatorData.bbands,
        "bbands"
      );
    }

    function onVisibleLogicalRangeChanged(newVisibleLogicalRange) {
      setVisibleLogicalRange(newVisibleLogicalRange);
    }
    // if(cryptoChartDataLength>280){
    //   chart.current.timeScale().scrollToPosition(cryptoChartDataLength);
    // }

    chart.current
      .timeScale()
      .subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged);
    return () => {
      chart.current.remove();
      eventSource.close();
    };
  }, [market, interval, internalIndicators,chartType]);

  useEffect(() => {
    let newCrypto =
      config.DOMAIN_NAME +
      "/history/" +
      `${market || marketState}/${
        interval || intervalState
      }/${cryptoTimeStamp}/${cryptoDataLimit}`;
    cryptoTimeStamp !== 0 &&
      fetch(newCrypto)
        .then((res) => res.json())
        .then((data) => {
          let tempCandlesticks = [];
          // let tempTimeLine = [];
          let tempVolume = [];
          data.data.forEach((row) => {
            let object = {
              time: row[0],
              open: row[1],
              high: row[2],
              low: row[3],
              close: row[4],
            };
            let volume = {
              time: row[0],
              value: row[5],
              color: row[1] > row[4] ? "#834C4B" : "#318B52",
            };
            // tempTimeLine.push(object.time);
            tempCandlesticks.push(object);
            tempVolume.push(volume);
          });
          let tempChartData = removeDuplicates([
            ...tempCandlesticks,
            ...cryptoChartData,
          ]).sort(compare);
          let tempVolumeData = removeDuplicates([
            ...tempVolume,
            ...cryptoVolumeData,
          ]).sort(compare);

          if(chartType==CANDLESTICK) candleSeries.current.setData(tempChartData);
          if(chartType==BAR) barSeries.current.setData(tempChartData);

          if(chartType==LINE){
            let tempLineData = [];
            tempChartData.forEach((obj) => {
              let lineObject = {
                time: obj["time"],
                value: obj["close"],
              };
              tempLineData.push(lineObject);
            });
            lineSeries.current.setData(tempLineData);
          }


          volumeSeries.current.setData(tempVolumeData);
          dispatch(
            updateCryptoChartData({
              cryptoChartData: tempChartData,
              cryptoVolumeData: tempVolumeData,
            })
          );
          setLoading(false);
        })
        .catch();

    if (ma) {
      getLineChart(
        `${config.DOMAIN_NAME}/ma/crypto/` +
          `${market || marketState}/${
            interval || intervalState
          }/${cryptoTimeStamp}/${cryptoDataLimit}`,
        maLineSeries.current,
        "crypto",
        dispatch,
        internalIndicatorData.ma,
        "ma"
      );

      console.log("inidcator ma", internalIndicatorData.ma);
    }
    if (sma) {
      getLineChart(
        `${config.DOMAIN_NAME}/sma/crypto/` +
          `${market || marketState}/${
            interval || intervalState
          }/${cryptoTimeStamp}/${cryptoDataLimit}`,
        smalineSeries.current,
        "crypto",
        dispatch,
        internalIndicatorData.sma,
        "sma"
      );
    }

    if (ema) {
      getLineChart(
        `${config.DOMAIN_NAME}/ema/crypto/` +
          `${market || marketState}/${
            interval || intervalState
          }/${cryptoTimeStamp}/${cryptoDataLimit}`,
        emalineSeries.current,
        "crypto",
        dispatch,
        internalIndicatorData.ema,
        "ema"
      );
    }

    if (wma) {
      getLineChart(
        `${config.DOMAIN_NAME}/wma/crypto/` +
          `${market || marketState}/${
            interval || intervalState
          }/${cryptoTimeStamp}/${cryptoDataLimit}`,
        wmalineSeries.current,
        "crypto",
        dispatch,
        internalIndicatorData.wma,
        "wma"
      );
    }
    if (bbands) {
      getBbandsChart(
        `${config.DOMAIN_NAME}/bbands/crypto/` +
          `${market || marketState}/${
            interval || intervalState
          }/${cryptoTimeStamp}/${cryptoDataLimit}`,
        bbandUpperSeries.current,
        bbandMiddleSeries.current,
        bbandLowerSeries.current,
        "crypto",
        dispatch,
        internalIndicatorData.bbands,
        "bbands"
      );
    }
  }, [cryptoTimeStamp]);

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
      if (width >= 1220) {
        chart.current.resize(1067, 395);
      }
      if (width >= 1070 && width < 1220) {
        chart.current.resize(930, 370);
      }
      if (width >= 900 && width < 1070) {
        chart.current.resize(800, 370);
      }
      if (width >= 800 && width < 900) {
        chart.current.resize(670, 370);
      }
      if (width >= 650 && width < 800) {
        chart.current.resize(540, 370);
      }
      if (width >= 550 && width < 650) chart.current.resize(430, 340);
      if (width >= 478 && width < 550) {
        chart.current.resize(380, 320);
      }
      if (width > 350 && width < 478) chart.current.resize(300, 280);
    };
  });

  const loadPrevious = () => {
    console.log("Previous stamp is", cryptoTimeStamp);
    if (visibleLogicalRange.from < 0) {
      let loadData = Math.ceil(Math.abs(visibleLogicalRange.from));
      console.log(loadData);
      console.log("Change stamp");
      dispatch(updateCryptoTimeStamp(cryptoTimeStamp + cryptoDataLimit));
      dispatch(updateCryptoDataLimit(loadData));
    }
    console.log("Next stamp is", cryptoTimeStamp);
  };

  return (
    <>
      {loading ? <Loader position="relative" left="46.5%" top="9%" /> : null}
      <div
        className="CryptoChart"
        style={{ display: loading ? "none" : "block" }}
        ref={ref}
        onMouseUpCapture={loadPrevious}
        onTouchEnd={loadPrevious}
      ></div>
      ;
    </>
  );
}

export default CryptoChart;
