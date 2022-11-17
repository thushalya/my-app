import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { CANDLESTICK } from "../utils/Constants.js";

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    cryptoChartData: [],
    cryptoChartDataLength: 0,
    cryptoVolumeData: [],
    cryptoTimeStamp: 0,
    cryptoDataLimit: 280,

    stockChartData: [],
    stockChartDataLength:0,
    stockVolumeData: [],
    stockTimeStamp: 0,
    stockDataLimit: 280,

    chartType: CANDLESTICK,
    internalIndicatorData: {
      ma: [],
      sma: [],
      ema: [],
      wma: [],
      bbands: {
        upper: [],
        middle: [],
        lower: [],
      },
    },
    externalIndicatorData: {
      rsi: [],
      obv: [],
      roc: [],
      macd: {
        series: [],
        signalSeries: [],
        histSeries: [],
      },
      stoch: {
        slowk: [],
        slowd: [],
      },
    },
  },
  reducers: {
    updateCryptoChartData: (state, action) => {
      state.cryptoChartData = action.payload.cryptoChartData;
      state.cryptoVolumeData = action.payload.cryptoVolumeData;
      state.cryptoChartDataLength = (action.payload.cryptoChartData).length
    },
    updateChartType: (state, action) => {
      state.chartType = action.payload;
    },
    updateCryptoTimeStamp: (state, action) => {
      state.cryptoTimeStamp = action.payload;
    },
    updateCryptoDataLimit: (state, action) => {
      state.cryptoDataLimit = action.payload;
    },
    updateIndicatorData: (state,action) => {
      return {
        ...state,
        internalIndicatorData: {
          ...state.internalIndicatorData,
          [action.payload.indicatorType]: action.payload.data,
        },
      };
    },
    updateExternalIndicatorData: (state,action) =>{
      return{
        ...state,externalIndicatorData:{
          ...state.externalIndicatorData,
          [action.payload.indicatorType]:action.payload.data,
        }
      }
    },
    updateStockChartData: (state, action) => {
      state.stockChartData = action.payload.stockChartData;
      state.stockVolumeData = action.payload.stockVolumeData;
      state.stockChartDataLength = (action.payload.stockChartData).length;
    },
    updateStockTimeStamp: (state, action) => {
      state.stockTimeStamp = action.payload;
    },
    updateStockDataLimit: (state, action) => {
      state.stockDataLimit = action.payload;
    },
  },
});

export const {
  updateCryptoChartData,
  updateChartType,
  updateCryptoDataLimit,
  updateCryptoTimeStamp,
  updateIndicatorData,
  updateStockChartData,
  updateStockDataLimit,
  updateStockTimeStamp,
  updateExternalIndicatorData,
} = chartSlice.actions;
export default chartSlice.reducer;
