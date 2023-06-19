import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Dash1.css";
import SelfAppraisalForm from "../form/SelfAppraisal/SelfAppraisal_form.jsx";

export const Employee = () => {
  const navigate = useNavigate();
  // const { user, setUser } = useContext(StateContext);
  // const { isSubmitted, setisSubmitted } = useGlobalContext();

  // console.log(isSubmitted);
  const { curuser, setcuruser } = useGlobalContext();
  console.log(curuser);

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
const SelfAppraisalFormHandler = ()=>{
  navigate('/form/SelfAppraisal')
}
  return (
    <div className="notes-wrapper">
      {curuser.APAR_status ? (
        <div className="container">
          <span>
            Apprsial to be filled for session : {curuser.appraiselPeriodFrom} to{" "}
            {curuser.appraiselPeriodTo}
          </span>

          <span>Name : {curuser.userName}</span>
          <span>Employee Id : {curuser.empId}</span>
          <span>Date of Birth :{curuser.dateOBirth}</span>
          <span>Designation : {curuser.designation}</span>
          <span>Present Pay :{curuser.presentpay}</span>
          <span>Date of entry in CDAC{curuser.dateOfEntryInCdac}</span>
          <span>Absence other than leave{curuser.absenceOtherThanLeave}</span>
          <span>Leave availed :{curuser.leaveAvailed}</span>
          <span>Date of filling APAR form : {curuser.dateOfFillingAparForm}</span>
          <span>Group : {curuser.group}</span>
          <button onClick={SelfAppraisalFormHandler} className="SAbtn">Fill Self Appraisal</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
