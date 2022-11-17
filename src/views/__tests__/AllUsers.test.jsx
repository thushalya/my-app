import React from 'react';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { store } from '../../redux/store';
import { Provider } from 'react-redux';
import AllUsers from '../all_users/AllUsers';

// mock FirebaseInit
jest.mock("../../firebaseInit");
jest.mock("../../services/API/AdminServices");

describe("Test Login component", () =>{
    const users =[
        {'_id': '633bee57adaa1cd479364e17', 
        'firstname': 'Nipun', 
        'lastname': 'Pramuditha', 
        'email': 'nipun@gmail.com', 
        'refresh_token': 'a', 
        'imagepath': 's', 
        'dob': '1/4/1997', 
        'country': 'Barbados', 
        'active': '1'}];

    const createInstance=() => {
        render(
            <Provider store={store}>
            <BrowserRouter>
            <AllUsers/>
            </BrowserRouter>
            </Provider>);
    }    
    
    it("render AllUsers component with filter and search buttton", () => {
        createInstance();
        const searchBtn = screen.getByTestId('search-btn');
        const filterBtn = screen.getByTestId('filter-btn');
        expect(searchBtn).not.toBeNull();
        expect(filterBtn).not.toBeNull();
    });
});

