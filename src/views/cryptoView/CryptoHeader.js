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
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, initWatchlist } from "../../redux/watchlist";

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
  
  // watchlist from redux store
  let {watchlist} = useSelector(state => state.watchlist)
  const dipsatch = useDispatch()

  // state to see if watchlist is alreay added
  const [watchlistAdded, setWatchlistAdded] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const handleAlert =(e)=>{
    setAnchorEl(e.currentTarget)
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = async () => {
    const response = await WatchlistServices.addMarket({
      crypto: market == "" ? marketState + "/USDT" : market + "/USDT",
    });
    console.log(response, "he hee");
    if (response.status == 200) {
      if (response.data.message == "Crypto type already added") {
        Toast.fire({
          icon: "warning",
          title: `${market == "" ? marketState + "/USDT" : market + "/USDT"}`,
          text: "Already added to watchlist",
        });
      } else {
        dipsatch(initWatchlist(response.data.data))
        setWatchlistAdded(true);
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
    console.log("market", market);
    console.log("marketState", marketState);
    if (watchlist?.includes(market+"/USDT") || (watchlist?.includes("BTC/USDT") && market == "")) {
      console.log("watchlist added")
      setWatchlistAdded(true)
    }else{
      console.log("watchlist not added")
      setWatchlistAdded(false)
    }

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
          data-cy='test-alert-btn'
          aria-describedby={id}
            className="alarm-icon"
            sx={{ color: "white" }}
            // onClick={handleOpen}
            onClick={handleAlert}
          />

          <Popover
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            className="alert-popover"
            // sx={{ mt: 16, ml: 10, borderWidth: 0, maxWidth: "300px" }}
            open={open}
            onClose={handleClose}
            id={id}
            anchorEl={anchorEl}

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

      {user && (!(watchlistAdded)
      ?
      (
        <button type="button" onClick={handleClick} className="watchlist-btn">
          Add to watchlist
        </button>
      )
      :
      (
        <button type="button" disabled="disabled" className="watchlist-btn-disabled">
          Added
        </button>
      ))
      }
    </div>
  );
}

export default CryptoHeader;
