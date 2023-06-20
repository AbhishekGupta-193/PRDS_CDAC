import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useNavigate } from "react-router-dom";


export const Reporting = () => {
    const {user, setuser} = useGlobalContext();
    const navigate = useNavigate();
    // console.log(user,"user array");
    useEffect(()=>{
        getUserForReporting();
    },[])
    const getUserForReporting = async ()=>{
        const {data} =  await axios.get("http://localhost:5000/getUsers")
        setuser(data);
        console.log(data);
    }
    const EvaluationFormHandler = ()=>{
        navigate('/form/Evaluation')
    }
    const usersWithStatus = user.filter(user => user.APAR_status === true && user.SelfAppraisal_status === true);
    const { curuser, setcuruser } = useGlobalContext();
  return (
    <div>
       Hello I'm reporting officer
       {usersWithStatus.map(user => (
      <div key={user._id}>
        <p>Email: {user.email}</p>
        <p>Username: {user.userName}</p>
        <button onClick={EvaluationFormHandler}>Fill Evaluation form</button>
      </div>
    ))}
       
    </div>
  )
}
