import React from "react";
import ChartLoader from "./ChartLoader";

function Loader({margin}) {
  return (
    <div
      style={{
        display: "inline",
        alignItems: "center",
        marginTop:`${margin}px`,
      }}
    >
      <ChartLoader />
    </div>
  );
}

export default Loader;
