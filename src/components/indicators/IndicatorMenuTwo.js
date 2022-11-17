import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Indicator from "../../assets/indicator.svg";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#20232B",
      width: "135px",
      
    },
  },
  controlLabel: {
    height: 33,
    transform: "scale(0.85)",
  },
  checkbox: {
    color: "white",
    fontSize: "20px",
    transform: "scale(0.8)",
  },
  btn: {
    width: "30px",
    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  formControl: {},
}));

const IndicatorMenuTwo = ({ displayExternalIndicators }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [indicators, setIndicators] = useState({
    rsi: false,
    obv: false,
    roc: false,
    macd: false,
    stoch: false,
  });

  const classes = useStyles();

  const handleChange = (event) => {
    setIndicators({ ...indicators, [event.target.name]: event.target.checked });
  };

  const { rsi, obv, roc, macd, stoch } = indicators;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    displayExternalIndicators(indicators);
  };

  return (
    <div data-testid="externalIndicators" className="indicator-select-btn">
      <button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="indicator-img-btn"
      >
        <img src={Indicator} alt="indicators" />
      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel
              style={{
                transform: "scale(0.94)",
                marginBottom: 8,
                color: "#286AEF",
                fontWeight: "bold",
                marginLeft: -13,
                marginTop: -10,
              }}
              component="legend"
            >
              Select Indicators
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                className={classes.controlLabel}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    style={{ color: "white" }}
                    checked={rsi}
                    onChange={handleChange}
                    name="rsi"
                  />
                }
                label="RSI"
              />
              <FormControlLabel
                className={classes.controlLabel}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    style={{ color: "white" }}
                    checked={obv}
                    onChange={handleChange}
                    name="obv"
                  />
                }
                label="OBV"
              />
              <FormControlLabel
                className={classes.controlLabel}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    style={{ color: "white" }}
                    checked={roc}
                    onChange={handleChange}
                    name="roc"
                  />
                }
                label="ROC"
              />

              <FormControlLabel
                className={classes.controlLabel}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    style={{ color: "white" }}
                    checked={macd}
                    onChange={handleChange}
                    name="macd"
                  />
                }
                label="MACD"
              />

              <FormControlLabel
                className={classes.controlLabel}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    style={{ color: "white" }}
                    checked={stoch}
                    onChange={handleChange}
                    name="stoch"
                  />
                }
                label="STOCH"
              />
            </FormGroup>
          </FormControl>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default IndicatorMenuTwo;
