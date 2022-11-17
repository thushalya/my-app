import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "../utils/requireAuth";
import Candle from "../views/candle/Candle";
import HomeView from "../views/homeView/homeView";
import Login from "../views/login/Login";
import Register from "../views/register/Register";
import NotFound from "../views/invalid_prohibited/NotFound";
import Unauthorized from "../views/invalid_prohibited/Unauthorized";
import CryptoView from "../views/cryptoView/CryptoView";
import Profile from "../views/profile/Profile";
import StockView from "../views/stockView/StockView";
import Watchlist from "../views/watchlist/Watchlist";
import AllUsers from './../views/all_users/AllUsers';
import Navigator from "./Navigator";
import Logout from "../utils/Logout";
import TokenRequest from './../views/notification/TokenRequest';

function Router() {

  const ROLES = {
    Admin: "1",
    User: "2",
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/" element={<HomeView />} />
        <Route path="/crypto" element={<CryptoView />} />
        <Route path="/stock" element={<StockView />} />

        <Route path="/navigate" element={<Navigator />} />

        {/* Invalid && prohibited routes  */}
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/users" element={<AllUsers/>}/>
        <Route path="/profile" element={<RequireAuth allowedRoles={[ROLES.User]}><Profile /></RequireAuth>} />
        {/* <Route path="/updateProfile" element={<RequireAuth allowedRoles={[ROLES.User]}><UpdateProfile /></RequireAuth>} /> */}
        <Route path="/watchlist" element={<RequireAuth allowedRoles={[ROLES.User]}><Watchlist /></RequireAuth>} />
        <Route path="/adminDashboard" element={<RequireAuth allowedRoles={[ROLES.User]}><AllUsers/></RequireAuth>} />
        {/* <Route path="/notification" element={<TokenRequest/>}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
