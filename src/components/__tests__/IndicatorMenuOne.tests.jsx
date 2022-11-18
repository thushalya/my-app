import React from "react";
import { render, screen } from "@testing-library/react";
import IndicatorMenuOne from "../indicators/IndicatorMenuOne";

describe("Test Indicator Menu One component", () => {
  const createInstance = () => {
    render(<IndicatorMenuOne />);
  };

  it("render Header One component", () => {
    createInstance();
    const indicator = screen.getByTestId("internalIndicatorMenu");
    expect(indicator).not.toBeNull();
  });

   it("render application name", () => {
     createInstance();
     const appName = screen.getByText("Select Indicators");
     expect(appName).not.toBeNull();
   });
});
