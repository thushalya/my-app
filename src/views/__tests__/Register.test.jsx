import React from 'react';
import { render, screen } from "@testing-library/react";
import Register from "../register/Register";
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

describe("Test Register component", () =>{
    const createInstance=() => {
        render(<BrowserRouter><Register/></BrowserRouter>);
    }    
    it("render register form with signup button", () => {
        createInstance();
        const btnList = screen.getByTestId('test-register-elem');
        expect(btnList).not.toBeNull();
    });
    it("email input should accept email", async() => {
        createInstance();
        const email = screen.getByTestId("test-email");
        await userEvent.type(email, "nameonly");
        expect(email.value).not.toBe("nameonly@gmail.com");
    });
});