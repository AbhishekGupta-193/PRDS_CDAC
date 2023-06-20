import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


export const Reporting = () => {
    const navigate = useNavigate();
   
  
    const { curuser, setcuruser } = useGlobalContext();
  return (
    <div>
       Hello I'm reporting officer
    </div>
  )
}
