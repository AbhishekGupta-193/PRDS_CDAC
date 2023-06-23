import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useNavigate } from "react-router-dom";
import "./EmployeeSection.css";

export const EmployeeSection = () => {
  const navigate = useNavigate();
  const { curuser, setcuruser } = useGlobalContext();
  console.log(curuser);
  
  const getData = async () => {
    try {
      setcuruser(JSON.parse(localStorage.getItem("curuser"))); 

      // const response = await axios.post("http://localhost:5000/getCurUser", { email: key });
      // console.log(response.data);
      // setcuruser(response.data);
      // console.log(curuser);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(curuser);
  
  const SelfAppraisalFormHandler = () => {
    navigate("/form/SelfAppraisal");
  };

  


  const DateFrom = new Date(curuser.appraiselPeriodFrom);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const From = DateFrom.toLocaleDateString(undefined, options);
  const DateTo = new Date(curuser.appraiselPeriodTo);
  const To = DateTo.toLocaleDateString(undefined, options);

  console.log(curuser);

  return (
    <div className="EmployeeSection-wrapper">
      Welcome {curuser.userName}
      {curuser.APAR_status ? (
        <div className="APAR_details">
          <span>
            Appraisal to be filled for session: {From} to {To}
            {curuser.appraiselPeriodTo}
          </span>

          <span>Name: {curuser.userName}</span>
          <span>Employee Id: {curuser.empId}</span>
          <span>Date of Birth: {curuser.dateOBirth}</span>
          <span>Designation: {curuser.designation}</span>
          <span>Present Pay: {curuser.presentpay}</span>
          <span>Date of entry in CDAC: {curuser.dateOfEntryInCdac}</span>
          <span>Absence other than leave: {curuser.absenceOtherThanLeave}</span>
          <span>Leave availed: {curuser.leaveAvailed}</span>
          <span>Date of filling APAR form: {curuser.dateOfFillingAparForm}</span>
          <span>Group: {curuser.group}</span>
          <button onClick={SelfAppraisalFormHandler} className="SAbtn">
            Fill Self Appraisal
          </button>
        </div>
      ) : null}
      {curuser.APAR_status && curuser.SelfAppraisal_status ? (
        <div className="self-appraisal-filled">Self appraisal filled</div>
      ) : null}
    </div>
  );
};
