import React from 'react';
import { render, screen } from "@testing-library/react";
import Login from "../login/Login";
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { store } from '../../redux/store';
import { Provider } from 'react-redux';

// mock FirebaseInit
jest.mock("../../firebaseInit");

describe("Test Login component", () =>{
    const createInstance=() => {
        render(
        <Provider store={store}>
        <BrowserRouter>
        <Login/>
        </BrowserRouter>
        </Provider>);
    }    
    it("render Login form with login button", () => {
        createInstance();
        const btnList = screen.getByTestId('login-elem');
        expect(btnList).not.toBeNull();
    });
    it("email input should accept email", async() => {
        createInstance();
        const email = screen.getByTestId("email");
        await userEvent.type(email, "nameonly");
        expect(email.value).not.toBe("nameonly@gmail.com");
    });
    it("password input should have type password", () =>{
        createInstance();
        const password = screen.getByPlaceholderText("password");
        expect(password).toHaveAttribute("type", "password");
    });
});

