import App from "./App";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./COMPONENTS/LOGIN/Login";
import { Register } from "./COMPONENTS/REGISTER/Register";
import { ToastContainer } from "react-toastify";
export const url = "http://3.111.218.168:3001";

export const Path = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      <ToastContainer newestOnTop={true} />
    </>
  );
};
