import React, { useState, useEffect } from "react";
import Loader from "../compnents/Loader";

import "./Crypto.css";
import { getCrypto } from "../api/external";

const Crypto = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //IIFE
    (async function cryptoApiCall() {
      const response = await getCrypto();
      setData(response);
    })();
    //cleanup
    setData([]);
  }, []);
  if (data.length === 0) {
    return <Loader text="cryptocurrencies" />;
  }
  const nagativeStyle = {
    color: "red",
  };
  const positiveStyle = {
    color: "green",
  };
  return (
    <table className="table">
      <thead>
        <tr className="head">
          <th>#</th>
          <th>coin</th>
          <th>symbol</th>
          <th>price</th>
          <th>24h</th>
        </tr>
      </thead>
      <tbody className="body">
        {data.map((coin) => (
          <tr id={coin.id} className="tableRow">
            <td>{coin.market_cap_rank}</td>
            <td>
              <div className="logo">
                <img src={coin.image} width={40} height={40} /> {coin.name}
              </div>
            </td>
            <td>
              <div className="symbol">{coin.symbol}</div>
            </td>
            <td>{coin.current_price}</td>
            <td
              style={
                coin.price_change_percentage_24h < 0
                  ? nagativeStyle
                  : positiveStyle
              }
            >
              {coin.price_change_percentage_24h}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Crypto;
