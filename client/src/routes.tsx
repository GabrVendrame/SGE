import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import HomePageUser from "./pages/HomePageUser";
import LoginAndRegister from "./pages/LoginAndRegister";

function RoutesDOM() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<LoginAndRegister />} path="/LoginAndRegister" />
        <Route element={<HomePageUser />} path="/HomeUser" />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesDOM;
