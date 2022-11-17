import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { removeDuplicates } from "../../utils/functions";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import config from "../../config.json";

function StochChart({ marketType, market, interval }) {
  const location = useLocation();
  try {
    var marketState = location.state.market;
  } catch (error) {
    marketState = "BTC";
  }
  var intervalState = location?.state?.interval || marketType == "crypto" ? "1m" : "5m";

  function getWindowDimension() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  const ref = useRef();
  const chart = useRef();
  const slowkSeries = useRef();
  const slowdSeries = useRef();

  const [loading, setLoading] = useState(false);

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

    slowkSeries.current = chart.current.addLineSeries({
      lineWidth: 1.2,
      color: "#8E0072",
    });
    slowdSeries.current = chart.current.addLineSeries({
      lineWidth: 1.5,
      color: "#00733E",
    });


    chart.current.applyOptions({
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const url =
      `${config.DOMAIN_NAME}/stoch/${marketType}/` +
      `${market || marketState}/${interval || intervalState}`;
    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const tempSlowk = [];
        const tempSlowd = [];
        const tempTimeLine = [];

        const dataSlowk = data["slowk"];
        const dataSlowd = data["slowd"];

        for (let key in dataSlowk) {
          if (dataSlowk.hasOwnProperty(key)) {
            let object = {
              time: marketType == "crypto" ? Number(key) : Number(key) / 1000,
              value: dataSlowk[key],
            };
            tempSlowk.push(object);
            tempTimeLine.push(object.time);
          }
          if (dataSlowd.hasOwnProperty(key)) {
            let object = {
              time: marketType == "crypto" ? Number(key) : Number(key) / 1000,
              value: dataSlowd[key],
            };
            tempSlowd.push(object);
          }

        }

        let tempSlowkData = removeDuplicates(tempSlowk);
        let tempSlowdData = removeDuplicates(tempSlowd);

        slowkSeries.current.setData(tempSlowkData);
        slowdSeries.current.setData(tempSlowdData);

        setLoading(false);
      })
      .catch();

    return () => {
      chart.current.remove();
    };
  }, [market, interval]);

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
        chart.current.resize(1067, 200);
      }
      if (width >= 1070 && width < 1220) {
        chart.current.resize(930, 200);
      }
      if (width >= 900 && width < 1070) {
        chart.current.resize(800, 382000);
      }
      if (width >= 800 && width < 900) {
        chart.current.resize(670, 200);
      }
      if (width >= 650 && width < 800) {
        chart.current.resize(540, 200);
      }
      if (width >= 550 && width < 650) chart.current.resize(430, 200);
      if (width >= 478 && width < 550) {
        chart.current.resize(380, 150);
      }
      if (width > 350 && width < 478) chart.current.resize(320, 150);
    };
  });

  return (
    <>
      {/* {loading ? <Loader position="relative" left="46.5%" top="9%" /> : null} */}
      <div className="d-flex flex-row">
        <div
          className="CryptoChart"
          ref={ref}
          // onMouseUpCapture={handleDrag}
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
              marginTop: "1rem",
              marginBottom: "-10px",
              color: "white",
              width: "fit-content",
            }}
            variant="h6"
          >
            STOCH
          </Typography>
        </div>
      </div>
      ;
    </>
  );

}

export default StochChart;
