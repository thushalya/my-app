import {
  updateCryptoChartData,
  updateCryptoDataLimit,
  updateCryptoTimeStamp,
  updateIndicatorData,
  updateExternalIndicatorData,
} from "../redux/chart";

export const removeDuplicates = (arr) => {
  const uniqueData = [];

  const unique = arr.filter((element) => {
    var time = element.time.toString().split(".")[0];
    const isDuplicate = uniqueData.includes(time);

    if (!isDuplicate) {
      uniqueData.push(time);
      return true;
    }
    return false;
  });
  return unique;
};

export const compare = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const timeA = a.time;
  const timeB = b.time;

  let comparison = 0;
  if (timeA > timeB) {
    comparison = 1;
  } else if (timeA < timeB) {
    comparison = -1;
  }
  return comparison;
};

export const resetInternalIndicators = (dispatch) => {
  dispatch(updateIndicatorData({ indicatorType: "ma", data: [] }));
  dispatch(updateIndicatorData({ indicatorType: "sma", data: [] }));
  dispatch(updateIndicatorData({ indicatorType: "wma", data: [] }));
  dispatch(updateIndicatorData({ indicatorType: "ema", data: [] }));
  dispatch(
    updateIndicatorData({
      indicatorType: "bbands",
      data: { upper: [], middle: [], lower: [] },
    })
  );
};

export const resetExternalIndicatorData = (dispatch) => {
  dispatch(updateExternalIndicatorData({ indicatorType: "rsi", data: [] }));
  dispatch(updateExternalIndicatorData({ indicatorType: "obv", data: [] }));
  dispatch(updateExternalIndicatorData({ indicatorType: "roc", data: [] }));
  dispatch(
    updateExternalIndicatorData({
      indicatorType: "macd",
      data: { series: [], signalSeries: [], histSeries: [] },
    })
  );
  dispatch(
    updateExternalIndicatorData({
      indicatorType: "stoch",
      data: { slowk: [], slowd: [] },
    })
  );
};
