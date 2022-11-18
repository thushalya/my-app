import React from "react";
import { render, screen } from "@testing-library/react";
import IndicatorMenuTwo from "../indicators/IndicatorMenuTwo";

describe("Test Indicator Menu One component", () => {
  const createInstance = () => {
    render(<IndicatorMenuTwo />);
  };

  it("render Header One component", () => {
    createInstance();
    const indicator = screen.getByTestId("externalIndicatorMenu");
    expect(indicator).not.toBeNull();
  });

  it("render application name", () => {
    createInstance();
    const appName = screen.getByText("Select Indicators");
    expect(appName).not.toBeNull();
  });
});
