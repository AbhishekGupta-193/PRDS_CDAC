import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Dash1.css";

export const Employee = () => {
  const navigate = useNavigate();
  // const { user, setUser } = useContext(StateContext);
  // const { isSubmitted, setisSubmitted } = useGlobalContext();
  const APAR_status = false;
  // console.log(isSubmitted);
  const { curuser, setcuruser } = useGlobalContext();
   useState( async()=>{
    console.log(APAR_status);
     const data = await axios.post("http://localhost:5000/checkAPAR")
    console.log(data);

   })
  // const generate = () => {
  //   axios.post("http://localhost:5000/updateRequest", user)
  //     .then(res => {
  //       setUser({
  //         email: res.data.email,
  //         passwoed: res.data.passwoed,
  //         request: res.data.request
  //       });
  //     })
  // }
  // const fillForrm = () => {
  //   navigate("/form/selfappraisal ");
  // }

  return (
    <div className="notes-wrapper">
      { APAR_status? (
        <div className="container">
          Name : {curuser.name}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
