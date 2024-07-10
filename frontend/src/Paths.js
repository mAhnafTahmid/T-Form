import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Form from "./Pages/Form";
import BaseForm from "./Pages/BaseForm";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Header from "./Components/Header";
import LandingPage from "./Pages/LandingPage";

const Paths = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          <Route exact path="/" element={<BaseForm />} />
          <Route path="/form" element={<Form />} />
          <Route path="/app" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Paths;
