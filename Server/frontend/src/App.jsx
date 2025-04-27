import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import SignupForm from "../src/Pages/Signup.jsx";
import Login from "../src/Pages/Login.jsx";
import Homepage from "../src/Pages/Homepage.jsx";
import Navbar from "./Componenet/Navbar.jsx";
import Logout from "./Componenet/logout.jsx";
// import TaskForm from "./Componenet/TaskForm.jsx";


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
      {/* <TaskForm/> */}
      <Navbar />
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
     
    </>
  );
}

export default App;
