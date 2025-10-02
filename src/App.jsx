import React from "react";
import {Routes,Route} from "react-router-dom"
import Login from "./pages/authentication/components/Login";
import "./App.css"
import SignUp from "./pages/authentication/components/SignUp";
import Home from "./pages/Home";

const App = () => {
  return <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<SignUp/>}/>
    <Route path="/home" element={<Home/>}/>
  </Routes>;
};

export default App;
