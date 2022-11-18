import React, { useState, useEffect } from "react";
import HeaderTwo from '../../components/headers/HeaderTwo'
import CryptoHeader from './CryptoHeader';
import CryptoIntervals from './CryptoIntervals';
import CryptoTypes from './CryptoTypes';
import { useLocation } from 'react-router-dom';
import CryptoChart from './CryptoChart';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Badge from '@mui/material/Badge';
import Alert from '../alert/Alert';
import LineChart from "../../components/technicalIndicators/lineChart";
import MACDChart from "../../components/technicalIndicators/macdChart";
import StochChart from "../../components/technicalIndicators/stochChart";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCryptoChartData,
  updateCryptoDataLimit,
  updateCryptoTimeStamp,
  updateIndicatorData,
} from "../../redux/chart";
// import PageLoader from "../../components/pageLoader/PageLoader";
import {
  resetInternalIndicators,
  resetExternalIndicatorData,
} from "../../utils/functions";
import Fade from "react-reveal/Fade";

function CryptoView() {
  const dispatch = useDispatch();
  const [market, setMarket] = useState("");
  const [interval, setInterval] = useState("");
  const [internalIndicators, setInternalIndicators] = useState({
    ma: false,
    sma: false,
    ema: false,
    wma: false,
    bbands: false,
  });
  const { cryptoChartDataLength} = useSelector((state) => state.chart);

  const [externalIndicators, setExternlIndicators] = useState({
    macd: false,
    obv: false,
    roc: false,
    rsi: false,
    stoch: false,
})
  const changeCryptoType = (marketType) => {
    setMarket(marketType);
    dispatch(
      updateCryptoChartData({
        cryptoChartData: [],
        cryptoVolumeData: [],
      })
    );
    dispatch(updateCryptoDataLimit(380));
    dispatch(updateCryptoTimeStamp(0));
   
    resetInternalIndicators(dispatch);
    resetExternalIndicatorData(dispatch);

  };
  const changeInterval = (interval) => {
    setInterval(interval);
    dispatch(
      updateCryptoChartData({
        cryptoChartData: [],
        cryptoVolumeData: [],
      })
    );
    dispatch(updateCryptoDataLimit(380));
    dispatch(updateCryptoTimeStamp(0));

    resetInternalIndicators(dispatch);
    resetExternalIndicatorData(dispatch);
  };
    const addInternalIndicators = (indicators) => {
      console.log("length", cryptoChartDataLength)
      setInternalIndicators(indicators);
      dispatch(updateCryptoDataLimit(cryptoChartDataLength));
      dispatch(updateCryptoTimeStamp(0));
      
    };
    const addExternalIndicators = (indicators) => {
      setExternlIndicators(indicators);
      dispatch(updateCryptoDataLimit(cryptoChartDataLength));
      dispatch(updateCryptoTimeStamp(0));
    };

  // getting user
  // try {
  //   var user = jwtDecode(Token.getAccessToken());
  // } catch (err) {
  //   user = null;
  // }
  
  // user = true
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const { macd, obv, roc, rsi, stoch } = externalIndicators;
  return (
    <div className="CryptoView">
      <Fade top><HeaderTwo /></Fade>
      
      <div className="d-flex flex-row">
        <div className="crypto-charts d-flex flex-column">
          <Fade right duration={1000} ><CryptoHeader market={market} interval={interval} /></Fade>        
          <Fade left duration={1000} delay={600}>
            <CryptoIntervals
              changeInterval={changeInterval}
              addInternalIndicators={addInternalIndicators}
              addExternalIndicators={addExternalIndicators}
            />
          </Fade>
          
          <CryptoChart
            market={market}
            interval={interval}
            internalIndicators={internalIndicators}
          />
          {rsi && <LineChart marketType="crypto" market={market} interval={interval} type="rsi"  />}
          {obv && <LineChart marketType="crypto" market={market} interval={interval} type="obv"/>}
          {roc && <LineChart marketType="crypto" market={market} interval={interval} type="roc"  />}
          {macd && <MACDChart marketType="crypto" market={market} interval={interval} />}
          {stoch && <StochChart marketType="crypto" market={market} interval={interval}/>}
        </div>
        <Fade duration={1000} delay={1500}>
          <div className="types-crypto">
            <CryptoTypes changeCryptoType={changeCryptoType} />
          </div>
        </Fade>
        
        {/* alert button */}
        {/* TODO: 
        fix css of the alert button */}
      </div>
    </div>
  
  );
}

export default CryptoView
