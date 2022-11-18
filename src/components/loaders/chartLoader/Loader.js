import React from "react";
import ChartLoader from "./ChartLoader";

function Loader({margin}) {
  return (
    <div
      data-testid="chartLoader"
      style={{
        display: "inline",
        alignItems: "center",
        marginTop: `${margin}px`,
      }}
    >
      <ChartLoader />
    </div>
  );
}

export default Loader;
