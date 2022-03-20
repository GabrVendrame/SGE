import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import LoginAndRegister from './pages/LoginAndRegister';

function RoutesDOM() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <Home /> } path="/"/>
        <Route element={ <LoginAndRegister /> } path="/LoginAndRegister"/>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesDOM;
