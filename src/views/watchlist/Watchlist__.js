import React from 'react';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import Profile from '../profile/Profile';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Watchlist from './Watchlist';

// mock
// jest.mock("../../firebaseInit");
// jest.mock("../../services/Token");
// jest.mock("../../services/API/UserServices");
// const token= require("../../services/Token");
// token.getAuth = jest.fn().mockImplementation(() => {const user = {'user_id': '1234'}; return user});


describe("Test Profile component", () =>{
    const createInstance=() => {
        render(
        <BrowserRouter>
        <Watchlist/>
        </BrowserRouter>);
    }  

    it("render watchlist component with header", () => {
        
    });

})