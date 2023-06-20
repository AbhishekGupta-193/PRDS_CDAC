import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useNavigate } from "react-router-dom";


export const EmployeeSection = () => {
    const navigate = useNavigate();
    const SelfAppraisalFormHandler = ()=>{
        navigate('/form/SelfAppraisal')
      }
  
    const { curuser, setcuruser } = useGlobalContext();
    console.log(curuser);
  return (
    <div>
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
        null
      )}
      {curuser.APAR_status && curuser.SelfAppraisal_status ? (
  <div className="self-appraisal-filled">Self appraisal filled</div>
) : null}
    </div>
  )
}

