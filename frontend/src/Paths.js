import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Form from "./Pages/Form";
import BaseForm from "./Pages/BaseForm";
import { Toaster } from "react-hot-toast";

const Paths = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route exact path="/" element={<BaseForm />} />
          <Route path="/form" element={<Form />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Paths;
