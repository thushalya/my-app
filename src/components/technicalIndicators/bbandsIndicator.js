import { removeDuplicates, compare } from "../../utils/functions";
import { updateIndicatorData } from "../../redux/chart";

export const getBbandsChart = (
  url,
  upperSeries,
  middleSeries,
  lowerSeries,
  type,
  dispatch,
  chartData,
  indicatorType
) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data.hasOwnProperty("error")) {
        const upper = [];
        const middle = [];
        const lower = [];

        let upperBandObject = data["upperband"];
        let lowerBandObject = data["lowerband"];
        let middleBandObject = data["middleband"];

        for (let key in upperBandObject) {
          if (upperBandObject.hasOwnProperty(key)) {
            let object = {
              time: type == "crypto" ? Number(key) : Number(key) / 1000,
              value: upperBandObject[key],
            };
            upper.push(object);
          }
          if (lowerBandObject.hasOwnProperty(key)) {
            let object = {
              time: type == "crypto" ? Number(key) : Number(key) / 1000,
              value: lowerBandObject[key],
            };
            lower.push(object);
          }
          if (middleBandObject.hasOwnProperty(key)) {
            let object = {
              time: type == "crypto" ? Number(key) : Number(key) / 1000,
              value: middleBandObject[key],
            };
            middle.push(object);
          }
        }
        let tempUpperSeries = removeDuplicates([
          ...upper,
          ...chartData.upper,
        ]).sort(compare);
        let tempMiddleSeries = removeDuplicates([
          ...middle,
          ...chartData.middle,
        ]).sort(compare);
        let tempLowerSeries = removeDuplicates([
          ...lower,
          ...chartData.lower,
        ]).sort(compare);

        upperSeries.setData(tempUpperSeries)
        lowerSeries.setData(tempLowerSeries)
        middleSeries.setData(tempMiddleSeries)

        dispatch(
          updateIndicatorData({
            indicatorType,
            data: {
              upper: tempUpperSeries,
              middle: tempMiddleSeries,
              lower: tempLowerSeries,
            },
          })
        );

        
      }
    });
};
