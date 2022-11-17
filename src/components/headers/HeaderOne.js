import React from "react";
import Logo from "../../assets/Logo.png";

function HeaderOne() {
  return (
    <div data-testid="headerOne" className="headerOne d-flex">
      <img src={Logo}  onClick={()=>{ window.location.href = "/";}} />
      
    </div>
  );
}

export default HeaderOne;
