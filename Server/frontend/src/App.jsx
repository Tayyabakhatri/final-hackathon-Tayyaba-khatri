import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import SignupForm from "../Pages/Signup.jsx";
import Login from "../Pages/Login.jsx";
import Homepage from "../Pages/Homepage.jsx";

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
        <Route path="/" element={<Homepage/>}/>
      </Routes>
    </>
  );
}

export default App;
