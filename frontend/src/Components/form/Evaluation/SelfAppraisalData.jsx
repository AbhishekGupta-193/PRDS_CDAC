import React, { useEffect, useState } from "react";
import "./SelfAppraisalData.css";
import { useNavigate } from "react-router-dom";
import { Evaluation_form } from "./Evaluation_form";
import { useGlobalContext } from "../../../StateContext.js";
import axios from "axios";
import { BASE_URL } from '../../Config.js';


const SelfAppraisalData = ({ isVisible, setisVisible ,final_score}) => {
  const navigate = useNavigate();
  const { CurEmp, setCurEmp } = useGlobalContext();
 

  const handleGoBack = () => {
    setisVisible(!isVisible);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const EmployeeId = JSON.parse(localStorage.getItem("EmployeeId"));
        const { data } = await axios.post(
         BASE_URL + "getCurUserforForms",
          { EmployeeId }
        );
  
        setCurEmp(data);
      } catch (error) {
        console.error(error);
      }
    };
     if(!CurEmp){
    getData();
     }
    if (CurEmp) {
      if (isVisible) {
        document
          .querySelector(".SelfAppraisalData_wrapper")
          .classList.add("SelfAppraisalData_wrapper-tr");
      }
      if (!isVisible) {
        document
          .querySelector(".SelfAppraisalData_wrapper")
          .classList.remove("SelfAppraisalData_wrapper-tr");
      }
    }
  }, [isVisible,CurEmp,final_score]);

  if (CurEmp) {
    var selfAppFormData1 =
      CurEmp.quarter[CurEmp.quarter.length - 1].selfAppFormData1;
    var selfAppFormData2 =
      CurEmp.quarter[CurEmp.quarter.length - 1].selfAppFormData2;

      console.log(selfAppFormData1 , selfAppFormData2);
  }
  return (
    <>
      {CurEmp && (
        <div className="SelfAppraisalData_wrapper">
          <div className="Emp_details">
            <h2>Employee Details</h2>
            <button className="cross-button" onClick={handleGoBack}>
              &#215;
            </button>
            <p>User Name: {CurEmp.userName}</p>
            <p>Employee ID: {CurEmp.empId}</p>
            <p>
              Date of Filling Self Appraisal Form:{" "}
              {new Date(
                CurEmp.quarter[CurEmp.quarter.length - 1].appraiselPeriodFrom
              ).toLocaleDateString()}
            </p>
            <p>
              Date of Filling Self Appraisal To:{" "}
              {new Date(
                CurEmp.quarter[CurEmp.quarter.length - 1].appraiselPeriodTo
              ).toLocaleDateString()}
            </p>
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
              {selfAppFormData1 && selfAppFormData1.map((data, index) => (
                <tr key={index}>
                  <td className="SNo">{++index}</td>
                  <td>{data.jobAssigned}</td>
                  <td>{data.Corresponding_Achievement}</td>
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
              {selfAppFormData2 && selfAppFormData2.map((data, index) => (
                <tr key={index}>
                  <td className="SNo">{++index}</td>
                  <td>{data.achievement}</td>
                  <td>{data.deliverables}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default SelfAppraisalData;
