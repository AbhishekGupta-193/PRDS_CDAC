import React, { useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useNavigate } from "react-router-dom";
import "./EmployeeSection.css";

export const EmployeeSection = () => {
  const navigate = useNavigate();
  const { curuser, setcuruser, user, loading } = useGlobalContext();

  const getData = async () => {
    try {
      const empId = JSON.parse(localStorage.getItem("empId"));
      const { data } = await axios.post("http://localhost:5000/getCurUser", {
        empId,
      });
      setcuruser(data);
      console.log(curuser);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const SelfAppraisalFormHandler = () => {
    navigate("/form/SelfAppraisal");
  };
  console.log(curuser);
  return (
    <>
      {curuser ? (
        <div className="EmployeeSection-wrapper">
          <div className="APAR_details-head">
            <h3> Welcome {curuser.userName}</h3>
          </div>
          {curuser.quarter[curuser.quarter.length - 1].APAR_status ? (
            <div className="APAR_details">
              <div className="APAR_details-inside">
                <span className="APAR_details-inside-1">
                  {" "}
                  Appraisal to be filled for Session{" "}
                </span>
                <span className="APAR_details-inside-2">
                  {" "}
                  {new Date(
                    curuser.quarter[
                      curuser.quarter.length - 1
                    ].appraiselPeriodFrom
                  ).toLocaleDateString() +
                    "  to  " +
                    new Date(
                      curuser.quarter[
                        curuser.quarter.length - 1
                      ].appraiselPeriodTo
                    ).toLocaleDateString()}
                </span>
              </div>
              <div className="APAR_details-inside-2">
                Name: {curuser.userName}
              </div>
              <div className="APAR_details-inside-2">
                Employee Id: {curuser.empId}
              </div>
              <div className="APAR_details-inside-2">
                Date of Birth:{" "}
                {new Date(curuser.dateOfBirth).toLocaleDateString()}
              </div>
              <div className="APAR_details-inside-2">
                Designation:{" "}
                {curuser.quarter[curuser.quarter.length - 1].designation}
              </div>
              <div className="APAR_details-inside-2">
                Present Pay:{" "}
                {curuser.quarter[curuser.quarter.length - 1].presentPay}
              </div>
              <div className="APAR_details-inside-2">
                Date of entry in CDAC:{" "}
                {new Date(curuser.dateOfEntryInCdac).toLocaleDateString()}
              </div>
              <div className="APAR_details-inside-2">
                Absence other than leave:{" "}
                {
                  curuser.quarter[curuser.quarter.length - 1]
                    .absenceOtherThanLeave
                }
              </div>
              <div className="APAR_details-inside-2">
                Leave availed:{" "}
                {curuser.quarter[curuser.quarter.length - 1].leaveAvailed}
              </div>
              <div className="APAR_details-inside-2">
                Date of filling APAR form:{" "}
                {new Date(
                  curuser.quarter[
                    curuser.quarter.length - 1
                  ].dateOfFillingAparForm
                ).toLocaleDateString()}
              </div>
              <div className="APAR_details-inside-2">
                Group: {curuser.quarter[curuser.quarter.length - 1].group}
              </div>
              <button onClick={SelfAppraisalFormHandler} className="SAbtn">
                Fill Self Appraisal
              </button>
              <span style={{ color: "red" }}>
                Last date to fill self Appraisal :{" "}
                {new Date(
                  curuser.quarter[
                    curuser.quarter.length - 1
                  ].dateOfFillingAparForm
                ).toLocaleDateString()}
              </span>
            </div>
          ) : null}
          {curuser.quarter[curuser.quarter.length - 1].APAR_status &&
          curuser.quarter[curuser.quarter.length - 1].SelfAppraisal_status ? (
            <div className="self-appraisal-filled">Self appraisal filled</div>
          ) : null}
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};
