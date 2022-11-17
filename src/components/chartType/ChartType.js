import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { LINE, CANDLESTICK ,BAR } from "../../utils/Constants";
import { updateChartType } from "../../redux/chart";
import Lines from "../../assets/line.svg"
import Candles from "../../assets/candles.svg";
import Bars from "../../assets/bar.svg";

const ChartTypes = () => {
  const dispatch = useDispatch();

  const chartType = useSelector((state) => state.chart.chartType);

  const [type, setType] = useState(chartType);

  const handleChange = (e) => {
    setType(e.target.value);
    console.log("type is",e.target.value )
  };

  useEffect(() => {
    type && dispatch(updateChartType(type));
  }, [type]);

  return (
    <div data-testid="chartTypes" className="chart-types">
      <FormControl>
        <Select
          style={{
            height: "27px",
            color: "white",
            backgroundColor: "#2E3035",
            fontSize: "14px",
            width:"56px",
          }}
          autoWidth
          value={type}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem
            style={{
              backgroundColor: "#292C31",
              //   marginBottom: "1px",
              marginTop: "-8px",
            }}
            className="chartType-menu"
            key={0}
            value={CANDLESTICK}
          >
            {type == CANDLESTICK ? (
              <img className="chart-type-img" src={Candles} />
            ) : (
              <span>
                <img className="chart-type-img" src={Candles} /> {CANDLESTICK}
              </span>
            )}
          </MenuItem>
          <MenuItem
            style={{ backgroundColor: "#292C31" }}
            className="chartType-menu"
            key={1}
            value={LINE}
          >
            {type == LINE ? (
              <img className="chart-type-img" src={Lines} />
            ) : (
              <span>
                <img className="chart-type-img" src={Lines} /> {LINE}
              </span>
            )}
          </MenuItem>
          <MenuItem
            style={{ backgroundColor: "#292C31", marginBottom: "-8px" }}
            className="chartType-menu"
            key={3}
            value={BAR}
          >
            {type == BAR ? (
              <img className="chart-type-img" src={Bars} />
            ) : (
              <span>
                <img className="chart-type-img" src={Bars} /> {BAR}
              </span>
            )}
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default ChartTypes;
