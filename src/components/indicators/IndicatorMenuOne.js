import React, { useEffect,useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import candleStick from "../../assets/candleStick.svg";

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
    width: "35px",
    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  formControl: {
    
  },
}));

const IndicatorMenuOne = ({ displayInternalIndicators }) => {
  const [anchorEl, setAnchorEl] = useState();
  const [indicators, setIndicators] = useState({
    ma: false,
    sma: false,
    ema: false,
    wma: false,
    bbands: false,
  });

  const { ma, sma, ema, wma, bbands } = indicators;

  const classes = useStyles();

  const handleChange = (event) => {
    setIndicators({ ...indicators, [event.target.name]: event.target.checked });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    displayInternalIndicators(indicators);
  };

  

  return (
    <div data-testid="internalSelect" className="indicator-select-btn">
      <button
        className="indicator-img-btn"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <img src={candleStick} alt="candleStick" />
      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem className={classes.menuItem}>
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
                    checked={ma}
                    onChange={handleChange}
                    name="ma"
                  />
                }
                label="MA"
              />
              <FormControlLabel
                className={classes.controlLabel}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    style={{ color: "white" }}
                    checked={sma}
                    onChange={handleChange}
                    name="sma"
                  />
                }
                label="SMA"
              />
              <FormControlLabel
                className={classes.controlLabel}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    style={{ color: "white" }}
                    checked={ema}
                    onChange={handleChange}
                    name="ema"
                  />
                }
                label="EMA"
              />

              <FormControlLabel
                className={classes.controlLabel}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    style={{ color: "white" }}
                    checked={wma}
                    onChange={handleChange}
                    name="wma"
                  />
                }
                label="WMA"
              />

              <FormControlLabel
                className={classes.controlLabel}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    style={{ color: "white" }}
                    checked={bbands}
                    onChange={handleChange}
                    name="bbands"
                  />
                }
                label="BBANDS"
              />
            </FormGroup>
          </FormControl>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default IndicatorMenuOne;
