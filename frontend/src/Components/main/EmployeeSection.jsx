import React, { useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useNavigate } from "react-router-dom";
import "./EmployeeSection.css";
import { BASE_URL } from '../Config.js';



export const EmployeeSection = () => {
  const navigate = useNavigate();
  const { curuser, setcuruser, user, loading } = useGlobalContext();

 
  useEffect(() => {
    const getData = async () => {
      try {
        const empId = JSON.parse(localStorage.getItem("empId"));
        const { data } = await axios.post(BASE_URL + "getCurUser", {
          empId,
        });
        setcuruser(data);
        console.log(curuser);
      } catch (error) {
        console.error(error);
      }
    };
   if(!curuser){
    getData();
   }
  }, []);

  const SelfAppraisalFormHandler = () => {
    navigate("/form/SelfAppraisal");
  };
  console.log(curuser);
  return (
    <>
      {curuser ? (
        <div className="EmployeeDashContainer">
        <div className="EmployeeDashContainer_left">
          <div className="APAR_details-head">
            <h3> Welcome {curuser.userName} !</h3>
          </div>
          <div>
            <img src="http://picsum.photos/210
  " alt="Profile pic" className='HrProfile_up_in_left_img' />
          </div>
          <div className='EmpProfile_details_down'>
            <div className='EmpProfile_details_down1'>
              <div className='HrProfile_up_in_right_small'>
                <div className='HrProfile_up_in_right_small_in1'>
                  Email
                </div>
                <div className='HrProfile_up_in_right_small_in2'>
                  {curuser.email}
                </div>
              </div>
              <div className='HrProfile_up_in_right_small'>
                <div className='HrProfile_up_in_right_small_in1'>
                  Date of Birth
                </div>
                <div className='HrProfile_up_in_right_small_in2'>
                  {new Date(curuser.dateOfBirth).toLocaleDateString()}
                </div>
              </div>
              <div className='HrProfile_up_in_right_small'>
                <div className='HrProfile_up_in_right_small_in1'>
                  Mobile
                </div>
                <div className='HrProfile_up_in_right_small_in2'>
                  798xyz56722
                </div>
              </div>
              <div className='HrProfile_up_in_right_small'>
                <div className='HrProfile_up_in_right_small_in1'>
                  Address
                </div>
                <div className='HrProfile_up_in_right_small_in2'>
                  Silchar Assam
                </div>
              </div>
            </div>
            <div className='EmpProfile_details_down1'>
              <div className='HrProfile_up_in_right_small'>
                <div className='HrProfile_up_in_right_small_in1'>
                  Role
                </div>
                <div className='HrProfile_up_in_right_small_in2'>
                  {curuser.quarter[curuser.quarter.length - 1].designation}
                </div>
              </div>
              <div className='HrProfile_up_in_right_small'>
                <div className='HrProfile_up_in_right_small_in1'>
                  Employee Id
                </div>
                <div className='HrProfile_up_in_right_small_in2'>
                  {curuser.empId}
                </div>
              </div>
              <div className='HrProfile_up_in_right_small'>
                <div className='HrProfile_up_in_right_small_in1'>
                  Group
                </div>
                <div className='HrProfile_up_in_right_small_in2'>
                  {curuser.quarter[curuser.quarter.length - 1].group}
                </div>
              </div>
              <div className='HrProfile_up_in_right_small'>
                <div className='HrProfile_up_in_right_small_in1'>
                  Onboarding Date
                </div>
                <div className='HrProfile_up_in_right_small_in2'>
                  {new Date(curuser.dateOfEntryInCdac).toLocaleDateString()}
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        {curuser ? (
          <div className="EmployeeSection-wrapper">
            <div className="APAR_details-head">
              <h3> Your latest APAR details </h3>
            </div>
            {curuser.quarter[curuser.quarter.length - 1].APAR_status ? (
              <div className="APAR_details">
                <div className="APAR_details-inside">
                  <span className="APAR_details-inside-1">
                    {" "}
                    Appraisal to be filled for Session{" "}
                  </span>
                  <span className="APAR_details-inside-12">
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
                  Last date to fill self Appraisal :: {" "}
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
        ) : "Loading"}
      </div>
      ) : (
        "Loading"
      )}
    </>
  );
};
