import React from "react";
import Crypto from "../../assets/cryptonMain.jpg";
import StarIcon from "@mui/icons-material/Star";
import Slide  from "react-reveal/Slide";
import Zoom from "react-reveal/Zoom";

function HomeSubTwo() {
  return (
    <div className="HomeSubTwo d-flex flex-row justify-content-evenly white">
      <Slide left duration={2500}>
        
      <div className="subOne-details">
        <header> <span className="main-title">Crypto analysis</span></header>
         <h3 ><span className="h3-first">Analyse</span> <span className="h3-second">Crypto Currencies</span></h3>

        <div className="detail-list d-flex flex-column">
            <p><span className="start-span"><StarIcon className="star-icon" /></span><span className="blue-keyword"> Visualize </span> <span> crypto charts</span></p>
            <p><span className="start-span"><StarIcon className="star-icon" /></span><span> View </span><span className="blue-keyword"> real time </span><span>data</span> </p>
            <p><span className="start-span"><StarIcon className="star-icon" /></span> <span> Make your predictions smartly</span></p>
        </div>
      </div>
      </Slide>
      <Slide right duration={2500}>
        <div className="img-sec" >
        <img src={Crypto} alt="" />
      </div>
      </Slide>
      
    </div>
  );
}

export default HomeSubTwo;
