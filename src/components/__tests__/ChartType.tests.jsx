import React from "react";
import { render, screen } from "@testing-library/react";
import ChartTypes from "../chartType/ChartType";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

describe("Test Chart Types component", () => {
  const createInstance = () => {
    render(
      <Provider store={store}>
        <ChartTypes />
      </Provider>
    );
  };

  it("render Chart Types component", () => {
    createInstance();
    const type = screen.getByTestId("chartTypes");
    expect(type).not.toBeNull();
  });

});