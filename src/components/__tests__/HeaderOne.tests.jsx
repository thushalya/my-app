import React from "react";
import { render, screen } from "@testing-library/react";
import HeaderOne from "../headers/HeaderOne";


describe("Test Header One component", () => {
  const createInstance = () => {
    render(<HeaderOne />);
  };

  it("render Header One component", () => {
    createInstance();
    const type = screen.getByTestId("headerOne");
    expect(type).not.toBeNull();
  });
});
