import React from 'react' 
import { useEffect } from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import ChartServices from "../../services/ChartServices"
import BitcoinIcon from "../../assets/bitcoin.png"
import EthIcon from "../../assets/etherium.png"
import SolanIcon from "../../assets/solana.png"
import BinanceIcon from "../../assets/binance.png"
import AvaxIcon from "../../assets/avax.png"
import TrxIcon from "../../assets/trx.png"

function CryptoTypes({changeCryptoType}) {

  const [cryptoTypes,setCryptoTypes] = useState([])
  
  useEffect(()=>{
    getCryptoList();
  },[])

  const getCryptoList=async()=>{
    try {
      const cryptos= await ChartServices.getcryptolist();
     
      setCryptoTypes(cryptos.data.data);
    } catch (error) {
      
    }
  }
    const handleClick = (type) => {
      changeCryptoType(type);
    }

  return (
    <div className="CryptoTypes">
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th>
              <span>Types</span><br />
              <span>/USDT</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {cryptoTypes.map((type) => {
            return (
              <tr key={type}>
                <td className="d-flex flex-row">
                  {/* <Icon name="btc" size={20}/> */}
                  <button
                    className="type-btn d-flex align-items-center"
                    value={type.substr(0, type.indexOf("/"))}
                    onClick={() => {
                      handleClick(type.substr(0, type.indexOf("/")));
                    }}
                  >
                    <div className="type-btn-inter">
                      <img
                        style={{ width: "17px", height: "17px" }}
                        src={
                          type == "BTC/USDT"
                            ? BitcoinIcon
                            : type == "ETH/USDT"
                            ? EthIcon
                            : type == "SOL/USDT"
                            ? SolanIcon
                            : type == "BNB/USDT"
                            ? BinanceIcon
                            : type == "AVAX/USDT"
                            ? AvaxIcon
                            : type == "TRX/USDT"
                            ? TrxIcon
                            : "none"
                        }
                      />
                      <p>{type.split("/")[0]}</p>
                    </div>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CryptoTypes
