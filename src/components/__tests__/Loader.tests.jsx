import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Loader from "../loaders/chartLoader/Loader"

describe("Test Chart Loader component", () => {
  const createInstance = () => {
    render(<Loader />);
  };

  it("render Page Loader component", () => {
    createInstance();
    const loader = screen.getByTestId("chartLoader");
    expect(loader).not.toBeNull();
  });
});
