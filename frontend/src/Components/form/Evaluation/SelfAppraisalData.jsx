import React, { useEffect, useState } from "react";
import "./SelfAppraisalData.css";
import { useNavigate } from "react-router-dom";
import {Evaluation_form} from "./Evaluation_form"


const SelfAppraisalData = ({isVisible,setisVisible}) => {
  const navigate = useNavigate();
  const CurEmp  = JSON.parse(localStorage.getItem("CurEmp"));
  const handleGoBack = () => {
    setisVisible(!isVisible)
  };
 useEffect(()=>{
  if(isVisible){
    document.querySelector('.SelfAppraisalData_wrapper').classList.add('SelfAppraisalData_wrapper-tr')
  }
  if(!isVisible){
    document.querySelector('.SelfAppraisalData_wrapper').classList.remove('SelfAppraisalData_wrapper-tr')
  }
 },[isVisible])
  const {
    userName,
    empId,
    dateOfFillingSelfAppraisalForm,
    dateOfFillingSelfAppraisalTo,
    selfAppFormData1,
    selfAppFormData2,
  } = CurEmp;
  const DateFrom = new Date(CurEmp.appraiselPeriodFrom);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const From = DateFrom.toLocaleDateString(undefined, options);
  const DateTo = new Date(CurEmp.appraiselPeriodTo);
  const To = DateTo.toLocaleDateString(undefined, options);
  return (
    <>
    <div className="SelfAppraisalData_wrapper">
      <div className="Emp_details">
      <h2>Employee Details</h2>
      <button className="cross-button" onClick={handleGoBack}>
        &#215;
      </button>
      <p>User Name: {userName}</p>
      <p>Employee ID: {empId}</p>
      <p>
        Date of Filling Self Appraisal Form: {From}
      </p>
      <p>Date of Filling Self Appraisal To: {To}</p>
      </div>

      <h3>Self Appraisal Form Data 1:</h3>
      <table className="form-table">
        <thead>
          <tr>
            <th className="SNo">Serial Number</th>
            <th>Job Assigned</th>
            <th>Achievement</th>
          </tr>
        </thead>
        <tbody>
          {selfAppFormData1.map((data, index) => (
            <tr key={index}>
              <td className="SNo">{++index}</td>
              <td>{data.jobAssigned}</td>
              <td>{data.achievement}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Self Appraisal Form Data 2:</h3>
      <table className="form-table">
        <thead>
          <tr>
            <th className="SNo">Serial Number</th>
            <th>Achievement</th>
            <th>Deliverables</th>
          </tr>
        </thead>
        <tbody>
          {selfAppFormData2.map((data, index) => (
            <tr key={index}>
              <td className="SNo">{++index}</td>
              <td>{data.achievement}</td>
              <td>{data.deliverables}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default SelfAppraisalData;
