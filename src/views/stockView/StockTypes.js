import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import ChartServices from "../../services/ChartServices";
import AAPL from "../../assets/AAPL.png"
import AMD from "../../assets/AMD.png";
import AMZN from "../../assets/AMZN.png";
import BABA from "../../assets/BABA.png";
import FB from "../../assets/FB.png";
import GOOGLE from "../../assets/GOOGLE.png";
import MSFT from "../../assets/MSFT.png";
import NFLX from "../../assets/NFLX.png";
import NKE from "../../assets/NKE.png";
import NVDA from "../../assets/NVDA.png";
import TSLA from "../../assets/TSLA.png";


function StockTypes({ changeStockType }) {
  const [stockTypes, setStockTypes] = useState([]);

  useEffect(() => {
    getStockList();
  }, []);

  const getStockList = async () => {
    try {
      const stock = await ChartServices.getstocklist();

      setStockTypes(stock.data.data);
    } catch (error) {}
  };
  const handleClick = (type) => {
    changeStockType(type);
  };

  return (
    <div className="CryptoTypes">
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {stockTypes.map((type) => {
            return (
              <tr key={type}>
                <td className="d-flex flex-row">
                  {/* <Icon name="btc" size={20}/> */}
                  <button
                    className="type-btn d-flex align-items-center"
                    value={type.substr(0, type.indexOf("/"))}
                    onClick={() => {
                      handleClick(type);
                    }}
                  >
                    <div className="type-btn-inter">
                      <img
                        style={{ width: "17px", height: "17px" }}
                        src={
                          type == "AAPL"
                            ? AAPL
                            : type == "AMD"
                            ? AMD
                            : type == "AMZN"
                            ? AMZN
                            : type == "BABA"
                            ? BABA
                            : type == "FB"
                            ? FB
                            : type == "GOOGL"
                            ? GOOGLE
                            : type == "MSFT"
                            ? MSFT
                            : type == "NFLX"
                            ? NFLX
                            : type == "NKE"
                            ? NKE
                            : type == "NVDA"
                            ? NVDA
                            :type == "TSLA"
                            ?TSLA :""
                        }
                      />
                      <p>{type}</p>
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

export default StockTypes
