import React from 'react';
import { render, screen } from "@testing-library/react";
import AlertDetails from '../homeView/AlertDetails';
import CryptoSec from '../homeView/CryptoSec';
import HomeSubOne from '../homeView/HomeSubOne';
import StockSec from '../homeView/StockSec';
import Footer from '../homeView/Footer';
import HomeSubTwo from '../homeView/HomeSubTwo';
import { BrowserRouter } from 'react-router-dom';

describe("Test HomeView component", () =>{
    it("render alert details", () => {
        render(<AlertDetails/>);
        const txt = screen.getByText("Subscribe to");
        expect(txt).toBeInTheDocument();
    });
    it("render Cypto section", () => {
        render(<BrowserRouter><CryptoSec/></BrowserRouter>);
        const txt = screen.getByTestId('cryptoDesc');
        expect(txt).toBeInTheDocument();
    });
    it("render HomeSubOne", () => {
        render(<HomeSubOne/>);
        const txt = screen.getByText("Make your predictions smartly");
        expect(txt).toBeInTheDocument();
    });
    it("render HomeSubTwo", () => {
        render(<HomeSubTwo/>);
        const txt = screen.getByText("Make your predictions smartly");
        expect(txt).toBeInTheDocument();
    });
    it("render Stock section", () => {
        render(<BrowserRouter><StockSec/></BrowserRouter>);
        const txt = screen.getByTestId('stockDes');
        expect(txt).toBeInTheDocument();
    });
    it("render the footer", () => {
        render(<Footer/>);
        const txt = screen.getByText("About us");
        expect(txt).toBeInTheDocument();
    });
});
