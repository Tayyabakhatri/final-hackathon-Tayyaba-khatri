import React from "react";
import "./App.css";
import SignupForm from "../Pages/Signup.jsx";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login.jsx";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
