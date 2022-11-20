import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import Loader from "../../components/loaders/chartLoader/Loader";
import { useLocation } from "react-router";
import { compare } from "../../utils/functions";
import {
  removeDuplicates,
  resetExternalIndicatorData,
  resetInternalIndicators,
} from "../../utils/functions";
import { getLineChart } from "../../components/technicalIndicators/lineSeries";
import { getBbandsChart } from "../../components/technicalIndicators/bbandsIndicator";
import config from "../../config.json";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStockChartData,
  updateStockDataLimit,
  updateStockTimeStamp,
} from "../../redux/chart";
import { CANDLESTICK, LINE, BAR } from "../../utils/Constants";

function StockChart({ market, interval, internalIndicators }) {
  const location = useLocation();

  const marketState = "TSLA";
  var intervalState = location?.state?.interval || "5m";

  const ref = useRef();
  const [loading, setLoading] = useState(true);
  const chart = useRef();
  const candleSeries = useRef();
  const lineSeries = useRef();
  const barSeries = useRef();
  const volumeSeries = useRef();

  const smalineSeries = useRef();
  const wmalineSeries = useRef();
  const emalineSeries = useRef();
  const maLineSeries = useRef();
  const bbandLowerSeries = useRef();
  const bbandMiddleSeries = useRef();
  const bbandUpperSeries = useRef();

  const dispatch = useDispatch();

  const {
    stockChartData,
    stockChartDataLength,
    stockVolumeData,
    chartType,
    stockTimeStamp,
    stockDataLimit,
    internalIndicatorData,
  } = useSelector((state) => state.chart);
  const [visibleLogicalRange, setVisibleLogicalRange] = useState({});

  const { ma, sma, ema, wma, bbands } = internalIndicators;

  function getWindowDimension() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  useEffect(() => {
    console.log("Chart data1", stockChartData);
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
    volumeSeries.current = chart.current.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.85,
        bottom: 0,
      },
    });
    chart.current.applyOptions({
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: false,
      },
    });

    console.log("market is", market || marketState);
    fetch(
      `${config.DOMAIN_NAME}` +
        `/stockhistory/${market || marketState}/${
          interval || intervalState
        }/0/${stockDataLimit}`
    )
      .then((res) => res.json())
      .then((data) => {
        let fetchedData = [];
        // let tempTimeLine = [];
        let tempVolume = [];
        data.forEach((row) => {
          let object = {
            time: row[0] / 1000,
            open: row[1],
            high: row[2],
            low: row[3],
            close: row[4],
          };
          let volume = {
            time: row[0] / 1000,
            value: row[5],
            color: row[1] > row[4] ? "#834C4B" : "#318B52",
          };
          fetchedData.push(object);
          tempVolume.push(volume);
        });
        let tempChartData = removeDuplicates([
          ...fetchedData,
          ...stockChartData,
        ]).sort(compare);
        let tempVolumeData = removeDuplicates([
          ...tempVolume,
          ...stockVolumeData,
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

        if (chartType == LINE) {
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
        if (chartType == BAR) {
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
          barSeries.current.setData(tempChartData);
        }

        volumeSeries.current.setData(tempVolumeData);

        setTimeout(() => {
          setLoading(false);
        }, 1500);

        dispatch(
          updateStockChartData({
            stockChartData: tempChartData,
            stockVolumeData: tempVolumeData,
          })
        );
        console.log("chart data2 is", stockChartData);
      })
      .catch();

    if (ma) {
      maLineSeries.current = chart.current.addLineSeries({
        lineWidth: 1,
        title: "MA",
        color: "blue",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/ma/stock/` +
          `${market || marketState}/${
            interval || intervalState
          }/0/${stockDataLimit}`,
        maLineSeries.current,
        "stock",
        dispatch,
        internalIndicatorData.ma,
        "ma"
      );
    }
    if (sma) {
      smalineSeries.current = chart.current.addLineSeries({
        lineWidth: 1,
        title: "SMA",
        color: "red",
      });
      getLineChart(
        `${config.DOMAIN_NAME}/sma/stock/` +
          `${market || marketState}/${
            interval || intervalState
          }/0/${stockDataLimit}`,
        smalineSeries.current,
        "stock",
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
        `${config.DOMAIN_NAME}/ema/stock/` +
          `${market || marketState}/${
            interval || intervalState
          }/0/${stockDataLimit}`,
        emalineSeries.current,
        "stock",
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
        `${config.DOMAIN_NAME}/wma/stock/` +
          `${market || marketState}/${
            interval || intervalState
          }/0/${stockDataLimit}`,
        wmalineSeries.current,
        "stock",
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
        `${config.DOMAIN_NAME}/bbands/stock/` +
          `${market || marketState}/${
            interval || intervalState
          }/0/${stockDataLimit}`,
        bbandUpperSeries.current,
        bbandMiddleSeries.current,
        bbandLowerSeries.current,
        "stock",
        dispatch,
        internalIndicatorData.bbands,
        "bbands"
      );
    }

    function onVisibleLogicalRangeChanged(newVisibleLogicalRange) {
      setVisibleLogicalRange(newVisibleLogicalRange);
    }

    chart.current
      .timeScale()
      .subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged);

    // chart.current.timeScale().scrollToPosition(stockChartDataLength);
    return () => {
      chart.current.remove();
      resetExternalIndicatorData(dispatch);
      resetInternalIndicators(dispatch);
      dispatch(
        updateStockChartData({
          stockChartData: [],
          stockVolumeData: [],
        })
      );
      dispatch(updateStockDataLimit(380));
      dispatch(updateStockTimeStamp(0));
    };
  }, [market, interval, internalIndicators, chartType]);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimension()
  );

  useEffect(() => {
    stockTimeStamp !== 0 &&
      fetch(
        `${config.DOMAIN_NAME}` +
          `/stockhistory/${market || marketState}/${
            interval || intervalState
          }/${stockTimeStamp}/${stockDataLimit}`
      )
        .then((res) => res.json())
        .then((data) => {
          let fetchedData = [];
          let tempVolume = [];
          data.forEach((row) => {
            let object = {
              time: row[0] / 1000,
              open: row[1],
              high: row[2],
              low: row[3],
              close: row[4],
            };
            let volume = {
              time: row[0] / 1000,
              value: row[5],
              color: row[1] > row[4] ? "#834C4B" : "#318B52",
            };
            fetchedData.push(object);
            tempVolume.push(volume);
          });
          let tempChartData = removeDuplicates([
            ...fetchedData,
            ...stockChartData,
          ]).sort(compare);
          let tempVolumeData = removeDuplicates([
            ...tempVolume,
            ...stockVolumeData,
          ]).sort(compare);

          if (chartType == CANDLESTICK)
            candleSeries.current.setData(tempChartData);
          if (chartType == BAR) barSeries.current.setData(tempChartData);

          if (chartType == LINE) {
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
            updateStockChartData({
              stockChartData: tempChartData,
              stockVolumeData: tempVolumeData,
            })
          );
        })
        .catch();

    if (ma) {
      getLineChart(
        `${config.DOMAIN_NAME}/ma/stock/` +
          `${market || marketState}/${
            interval || intervalState
          }/${stockTimeStamp}/${stockDataLimit}`,
        maLineSeries.current,
        "stock",
        dispatch,
        internalIndicatorData.ma,
        "ma"
      );
    }
    if (sma) {
      getLineChart(
        `${config.DOMAIN_NAME}/sma/stock/` +
          `${market || marketState}/${
            interval || intervalState
          }/${stockTimeStamp}/${stockDataLimit}`,
        smalineSeries.current,
        "stock",
        dispatch,
        internalIndicatorData.sma,
        "sma"
      );
    }

    if (ema) {
      getLineChart(
        `${config.DOMAIN_NAME}/ema/stock/` +
          `${market || marketState}/${
            interval || intervalState
          }/${stockTimeStamp}/${stockDataLimit}`,
        emalineSeries.current,
        "stock",
        dispatch,
        internalIndicatorData.ema,
        "ema"
      );
    }
    if (wma) {
      getLineChart(
        `${config.DOMAIN_NAME}/wma/stock/` +
          `${market || marketState}/${
            interval || intervalState
          }/${stockTimeStamp}/${stockDataLimit}`,
        wmalineSeries.current,
        "stock",
        dispatch,
        internalIndicatorData.wma,
        "wma"
      );
    }
    if (bbands) {
      getBbandsChart(
        `${config.DOMAIN_NAME}/bbands/stock/` +
          `${market || marketState}/${
            interval || intervalState
          }/${stockTimeStamp}/${stockDataLimit}`,
        bbandUpperSeries.current,
        bbandMiddleSeries.current,
        bbandLowerSeries.current,
        "stock",
        dispatch,
        internalIndicatorData.bbands,
        "bbands"
      );
    }
  }, [stockTimeStamp]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimension());
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      // chart.current.resize(windowDimensions["width"] * 0.85, 380);
      const width = windowDimensions["width"];
      if (width >= 1460) chart.current.resize(1330, 455);
      if (width >= 1400 && width < 1460) chart.current.resize(1245, 455);
      if (width >= 1350 && width < 1400) chart.current.resize(1180, 455);
      if (width >= 1285 && width < 1350) chart.current.resize(1130, 455);
      if (width >= 1220 && width < 1285) chart.current.resize(1067, 455);
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
        chart.current.resize(380, 300);
      }
      if (width >= 440 && width < 478) chart.current.resize(365, 240);
      if (width >= 400 && width < 440) chart.current.resize(325, 240);
      if (width < 400) chart.current.resize(280, 240);
    };
  });

  const loadPrevious = () => {
    console.log("Previous stamp is", stockTimeStamp);
    if (visibleLogicalRange.from < 0) {
      let loadData = Math.ceil(Math.abs(visibleLogicalRange.from));
      console.log(loadData);
      console.log(visibleLogicalRange.from);
      dispatch(updateStockTimeStamp(stockTimeStamp + stockDataLimit));
      dispatch(updateStockDataLimit(loadData));
    }
    console.log("Next stamp is", stockTimeStamp);
  };

  return (
    <>
      {loading ? <Loader margin={150} /> : null}
      <div
        data-cy="test-stock-chart"
        className="StockChart"
        style={{ display: loading ? "none" : "block", marginBottom: "15px" }}
        ref={ref}
        onMouseUpCapture={loadPrevious}
        onTouchEnd={loadPrevious}
      />
    </>
  );
}

export default StockChart;
