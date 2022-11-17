import React from 'react';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import Profile from '../profile/Profile';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import UserServices from '../../services/API/UserServices';
import ChangePassword from '../profile/ChangePassword';

// mock
jest.mock("../../firebaseInit");
jest.mock("../../services/Token");
// mock react lottie
jest.mock("react-lottie", () => ({
    __esModule: true,
    default: (props) => <div data-testid="react-lottie">{props.options.animationData}</div>,
}));
// mock pageloader
jest.mock("../../components/pageLoader/PageLoader", () => ({
    __esModule: true,
    default: () => <div data-testid="page-loader"></div>,
}));

// jest.mock("../../services/API/UserServices");
// const token= require("../../services/Token");
// token.getAuth = jest.fn().mockImplementation(() => {const user = {'user_id': '1234'}; return user});

jest.setTimeout(30000);
describe("Test Profile component", () =>{
    

    const createInstance=() => {
        
        render(
        <Provider store={store}>
        <BrowserRouter>
        <Profile/>
        </BrowserRouter>
        </Provider>);
    }  

    it("render profile form with two buttons", () => {
        jest.useFakeTimers();
        jest.advanceTimersByTime(250);
        const loader = true
        createInstance();
        const btnList = screen.getByTestId('profile-elem');
        expect(btnList).not.toBeNull();
    });

    it("render the profile pic", () => {
        createInstance();
        const profilePic = screen.getByTestId('profile-pic');
        expect(profilePic).not.toBeNull();
    });

    it("Change password form loads with a save button", async() =>{
        render(<BrowserRouter><ChangePassword/></BrowserRouter>);
        const btnList = screen.getByTestId('chng-pwd-elem');
        expect(btnList).not.toBeNull();
    });

    it("Change password form contains current, new, confirm password fields", async() =>{
        render(<BrowserRouter><ChangePassword/></BrowserRouter>);
        const currentPwd = screen.getByTestId('current-password');
        const newPwd = screen.getByTestId('new-password');
        const confirmPwd = screen.getByTestId('confirm-password');
        expect(currentPwd).not.toBeNull();
        expect(newPwd).not.toBeNull();
        expect(confirmPwd).not.toBeNull();
    });
})