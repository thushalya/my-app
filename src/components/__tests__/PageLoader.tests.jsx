import React from 'react';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import PageLoader from '../pageLoader/PageLoader';


describe("Test Page Loader component", () =>{
    const createInstance=() => {
        render(
            <PageLoader/>
        )
    }

    it ("render Page Loader component", () => {
        createInstance();
        const loader = screen.getByTestId("loader");
        expect(loader).not.toBeNull();
    });

    it("render application name", () => {
        createInstance();
        const appName = screen.getByText("crypsto|x|plorer");
        expect(appName).not.toBeNull();
    });

});

