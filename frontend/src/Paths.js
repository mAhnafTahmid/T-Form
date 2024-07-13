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
import ProfilePage from "./Pages/ProfilePage";
import { useAuthContext } from "./Context/AuthContext";

const Paths = () => {
  const { user } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route
            path="/form"
            element={user?.length !== 0 ? <BaseForm /> : <Login />}
          />
          <Route
            path="/login"
            element={user?.length !== 0 ? <ProfilePage /> : <Login />}
          />
          <Route
            path="/signup"
            element={user?.length !== 0 ? <ProfilePage /> : <Signup />}
          />
          <Route
            path="/profile"
            element={user?.length !== 0 ? <ProfilePage /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Paths;
