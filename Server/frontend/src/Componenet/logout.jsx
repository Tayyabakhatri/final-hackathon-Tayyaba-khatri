import React, { useEffect } from "react";
import { logout } from "../../reducer/authslice.js"; //thi is a reducer
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(logout())
    navigate("/")

 })
  return (
    <>
      <h1>hello</h1>
    </>
  );
};

export default LogOut;