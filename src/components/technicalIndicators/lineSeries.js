import { removeDuplicates,compare } from "../../utils/functions";
import { updateIndicatorData } from "../../redux/chart";

export const getLineChart = (url,lineSeries,type,dispatch,chartData,indicatorType) => {
    let tempLineData = [];
    fetch(url)
    .then(res => res.json())
    .then(data=>{
        console.log("state redux is", chartData)
        if (!data.hasOwnProperty('error')){
            let tempLines = []
            for(let i in data){
                if(data.hasOwnProperty(i)){
                    let object = {
                      time: type=="crypto"?Number(i):Number(i)/1000,
                      value: data[i],
                    }
                    tempLines.push(object)
                    
                }
            }
            // console.log(tempLines)
            let tempLineData = removeDuplicates([...tempLines, ...chartData]).sort(compare);
            lineSeries.setData(tempLineData)
            dispatch(updateIndicatorData({indicatorType,data: tempLineData}));
        }
        
    }).catch()
    return tempLineData;
};
