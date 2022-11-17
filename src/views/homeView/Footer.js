import React from 'react'
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <div className="footer d-flex flex-row justify-content-evenly ">
      <div className="footer-details">
        <header>Crypto|X|plorer</header>
        <p>Make your trading life easier</p>
      </div>
      <div className="footer-contact footer-sub">
        <header>About us</header>
      </div>
      <div className="footer-about footer-sub">
        <header>Contact us</header>
        <div className="footer-icons">
          <FacebookIcon className="footer-icons-white" />
          <LinkedInIcon className="footer-icons-white" />
          <TwitterIcon className="footer-icons-white" />
        </div>
      </div>
    </div>
  );
}

export default Footer
