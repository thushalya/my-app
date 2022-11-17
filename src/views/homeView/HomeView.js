import React from "react";
import HeaderTwo from "../../components/headers/HeaderTwo";
import AlertDetails from "./AlertDetails";
import CryptoSec from "./CryptoSec";
import HomeSubOne from "./HomeSubOne";
import HomeSubTwo from "./HomeSubTwo";
import StockSec from "./StockSec";
import Slide from "react-reveal/Slide";
import Flip from "react-reveal/Flip";


import Footer from "./Footer";
import PageLoader from "../../components/pageLoader/PageLoader";
import PreLoader from "../../components/loader/PageLoader";
import PWA from "./PWA";

function HomeView() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="homeView ">
          <HeaderTwo />
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="5000">
                <HomeSubOne />
              </div>
              <div className="carousel-item" data-bs-interval="5000">
                <HomeSubTwo />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div className="app-description d-flex flex-column">
            <header>Crypto Stock Explorer is a platform where you can</header>
            <div className="app-details">
              <p>Analyse stock data and crypto currencies</p>
              <p>
                View real time data of crypto currencies and make the future
                price and volume variations easily
              </p>
              <p>Make your trading life simpler</p>
            </div>
          </div>
          <Flip duration={3000}>
            <PWA />
          </Flip>

          <div className="market-cards">
            <Slide left duration={1500}>
              <CryptoSec className="crypto-comp" />
            </Slide>
            <Slide right duration={1500}>
              <StockSec className="stock-comp" />
            </Slide>
          </div>
          <AlertDetails />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default HomeView;
