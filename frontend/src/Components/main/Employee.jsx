import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Dash1.css";
import { EmployeeSection } from "./EmployeeSection.jsx";
import { Reporting } from "./Reporting.jsx";


export const Employee = () => {
  const navigate = useNavigate();
  
  const { curuser, setcuruser } = useGlobalContext();
  console.log(curuser);



  return (
    <div className="notes-wrapper">
     <EmployeeSection/>
     <Reporting/>
    </div>
  );
};
