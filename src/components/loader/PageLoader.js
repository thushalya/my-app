import React, {Fragment} from 'react';
import "./PageLoader.css"
import CoinLoader from '../loaders/coinLoader/CoinLoader';

const PreLoader = () => {
	// console.log('preloader', props.isLoading);
	return (
    // props.isLoading &&
    <Fragment>
      <div id="preloader" data-testid="preloader">
        {/*  Preloader */}
        <div id="digimax-preloader" className="digimax-preloader">
          {/* Preloader Animation */}
          <div className="preloader-animation" style={{marginTop:'-100px'}}>
            {/* Spinner */}
            <div className="img">
              {/* <div className="spinner"/> */}
              {<CoinLoader/>}
              {/* <img style={{borderRadius:"70px",position:"absolute",top:"24%",left:"44.9%"}} src={loader} alt="" /> */}
            </div>
            {/* Loader */}
            <div className="loader">
              <span data-text-preloader="C" className="animated-letters">
                C
              </span>
              <span data-text-preloader="R" className="animated-letters">
                R
              </span>
              <span data-text-preloader="Y" className="animated-letters">
                Y
              </span>
              <span data-text-preloader="P" className="animated-letters">
                P
              </span>
              <span data-text-preloader="S" className="animated-letters">
                S
              </span>
              <span data-text-preloader="T" className="animated-letters">
                T
              </span>
              <span data-text-preloader="O" className="animated-letters">
                O
              </span>
              <span data-text-preloader="X" className="animated-letters">
                X
              </span>
              <span data-text-preloader="P" className="animated-letters">
                P
              </span>
              <span data-text-preloader="L" className="animated-letters">
                L
              </span>
              <span data-text-preloader="O" className="animated-letters">
                O
              </span>
              <span data-text-preloader="R" className="animated-letters">
                R
              </span>
              <span data-text-preloader="E" className="animated-letters">
                E
              </span>
              <span data-text-preloader="R" className="animated-letters">
                R
              </span>
            </div>
          </div>
          {/* Loader Animation */}
          <div className="loader-animation">
            <div className="row h-100">
              {/* Single Loader */}
              <div className="col-3 single-loader p-0">
                <div className="loader-bg" />
              </div>
              {/* Single Loader */}
              <div className="col-3 single-loader p-0">
                <div className="loader-bg" />
              </div>
              {/* Single Loader */}
              <div className="col-3 single-loader p-0">
                <div className="loader-bg" />
              </div>
              {/* Single Loader */}
              <div className="col-3 single-loader p-0">
                <div className="loader-bg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PreLoader;