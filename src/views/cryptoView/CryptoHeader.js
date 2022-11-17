import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import config from "../../config.json";
import WatchlistServices from "../../services/WatchlistServices";
import jwtDecode from "jwt-decode";
import Box from "@mui/material/Box";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import Badge from "@mui/material/Badge";
import Alert from "../alert/Alert";
import AlertModal from "@mui/material/Modal";
import Swal from "sweetalert2";
import { Container } from "@mui/system";
import { Popover, Popper } from "@mui/material";
import Token from "../../services/Token";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  background: "#111726",
  color: "white",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function CryptoHeader({ market, interval }) {
  const obj = { price: 0, volume: 0, high: 0, low: 0 };
  const [values, setValues] = useState(obj);
  // for alert
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = async () => {
    const response = await WatchlistServices.addMarket({
      crypto: market == "" ? marketState + "/USDT" : market + "/USDT",
    });
    if (response.status == 200) {
      if (response.data.message == "Crypto type already added") {
        Toast.fire({
          icon: "warning",
          title: `${market == "" ? marketState + "/USDT" : market + "/USDT"}`,
          text: "Already added to watchlist",
        });
      } else {
        Toast.fire({
          icon: "success",
          title: `${market == "" ? marketState + "/USDT" : market + "/USDT"}`,
          text: "Successfully added to watchlist",
        });
      }
      console.log(response);
    } else {
      Toast.fire({
        icon: "error",
        title: `Error occured`,
      });
    }
  };
  const location = useLocation();
  const marketState = "BTC";
  var intervalState = location?.state?.interval || "1m";

  try {
    var user = jwtDecode(Token.getAccessToken());
  } catch (err) {
    user = null;
  }
  user = true;
  useEffect(() => {
    let eventSource = new EventSource(
      `${config.DOMAIN_NAME}/present/` + `${market || marketState}/1d`
    );

    eventSource.addEventListener("message", function (e) {
      let parsedData = JSON.parse(e.data);
      setValues({
        price: parsedData[4],
        volume: parsedData[5],
        high: parsedData[2],
        low:parsedData[3]
      });
    });

    return () => {
      eventSource.close();
    };
  }, [market]);

  return (
    <div className="CryptoHeader crypto-bar stock-header crypto-top">
      {user && (
        <div className="d-flex">
          <p className="alerts-name" style={{ marginRight: "20px" }}>
            Alerts
          </p>
          <AccessAlarmsIcon
            className="alarm-icon"
            sx={{ color: "white" }}
            onClick={handleOpen}
          />

          <Popover
            sx={{ mt: 20, ml: 10, borderWidth: 0, maxWidth: "400px" }}
            open={open}
            onClose={handleClose}
          >
            <Alert
              open={open}
              onClose={handleClose}
              market={market || marketState}
              // interval={location?.state?.interval || "1m"}
            />
          </Popover>
        </div>
      )}
      <header className="stock-header">
        {market || marketState}/USDT - <span>{interval || intervalState}</span>
      </header>
      <div className="volumes">
        <div className="d-flex flex-row justify-content-evenly volumes-sub">
          <div className="d-flex flex-column">
            <p>24h Vol</p>
            <span className="volume-value">{values.volume.toFixed(2)}</span>
          </div>
          <div className="d-flex flex-column">
            <p>24h High</p>
            <span className="volume-value">{values.high.toFixed(2)}</span>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-evenly volumes-sub">
          <div className="d-flex flex-column">
            <p>24h Low</p>
            <span className="volume-value">{values.low.toFixed(2)}</span>
          </div>
          <div className="d-flex flex-column">
            <p>24h Price</p>
            <span className="volume-value">{values.price.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {user && (
        <button type="button" onClick={handleClick} className="watchlist-btn">
          Add to watchlist
        </button>
      )}
    </div>
  );
}

export default CryptoHeader;
