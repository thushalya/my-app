import React from "react";
import { Button } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import Typography from "@mui/material/Button";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Jump from "react-reveal/Jump";

function PWA() {
  window.onload = function () {
    let deferredPrompt;
    const div = document.getElementById("add-to");
    var button = document.getElementById("add-to-btn");
    div.style.display = "none";
    const wrapper = document.getElementById("pwa");
    wrapper.style.display = "none";

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredPrompt = event;
      div.style.display = "block";
      wrapper.style.display = "block";
    });

    button.addEventListener("click", () => {
      div.style.display = "none";
      wrapper.style.display = "none";
      
      deferredPrompt.prompt();
      const result = deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
        } else {
        }
      });
      window.deferredPrompt = null;
    });

    window.addEventListener("appinstalled", () => {
      div.style.display = "none";
      wrapper.style.display = "none";
      document.getElementById("pwa").style.display = "none";
      deferredPrompt = null;
    });
  };

  return (
    <Jump>
      <div id="pwa" className="pwa d-flex flex-column">
        <header>
          <span className="paw-span1">Download our </span>
          <span className="pwa-span2">Mobile App</span>
        </header>
        <div id="add-to">
          <Button className="pwa-button" id="add-to-btn">
            <PhoneIphoneIcon />
            <Typography style={{ color: "#053ffbfc" }}>Install</Typography>
          </Button>
        </div>
      </div>
    </Jump>
  );
}

export default PWA;
