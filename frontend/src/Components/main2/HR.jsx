import "../../css/notes.css";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../StateContext";
import { IoIosPeople } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import { MdPendingActions } from "react-icons/md";
import { IoIosCloudDone } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import "../Loader/Loader1.css";

export const HR = () => {
  const navigate = useNavigate();
  const { curuser, setcuruser, user, setfilteredarray, loading } =
    useGlobalContext();

  const handle_APAR_issued = () => {
    const APAR_issued = user?.filter(
      (element) => element.Role.HR === false && element.APAR_status === true
    );
    setfilteredarray(APAR_issued);
  };
  const handle_APAR_tobeIssued = () => {
    const APAR_not_initiated = user?.filter(
      (element) => element.Role.HR === false && element.APAR_status === false
    );
    setfilteredarray(APAR_not_initiated);
  };
  const handle_Self_Appraisal = () => {
    const Self_Appraisal_filled = user?.filter(
      (element) =>
        element.Role.HR === false &&
        element.APAR_status === true &&
        element.SelfAppraisal_status === true
    );
    setfilteredarray(Self_Appraisal_filled);
  };
  const handle_Evaluation_completed = () => {
    const APAR_completed = user?.filter(
      (element) =>
        element.Role.HR === false &&
        element.APAR_status === true &&
        element.SelfAppraisal_status === true &&
        element.Evalutation_status === true
    );
    setfilteredarray(APAR_completed);
  };
  const handle_totalemp = () => {
    setfilteredarray(user);
  };
  const [len, setlen] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const empId = JSON.parse(localStorage.getItem("empId"));
        const { data } = await axios.post("http://localhost:5000/getCurUser", {
          empId,
        });
        setcuruser(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (!curuser) {
      getData();
    }
    setlen([
      user?.length,
      user?.filter(
        (element) => element.Role.HR === false && element.APAR_status === true
      ).length,
      user?.filter(
        (element) => element.Role.HR === false && element.APAR_status === false
      ).length,
      user?.filter(
        (element) =>
          element.Role.HR === false &&
          element.APAR_status === true &&
          element.SelfAppraisal_status === true
      ).length,
      user?.filter(
        (element) =>
          element.Role.HR === false &&
          element.APAR_status === true &&
          element.SelfAppraisal_status === true &&
          element.Evalutation_status === true
      ).length,
    ]);
  }, [user]);

  return (
    <>
      {!loading && curuser ? (
        <div className="notes-wrapper">
          <div className="HrProfile_up_in">
            <div className="HrProfile_up_in_left">
              <h3>
                <FaUserEdit /> {curuser.userName}
              </h3>
              <img
                src="https://picsum.photos/210
  "
                alt="Profile pic"
                className="HrProfile_up_in_left_img"
              />
            </div>
            <div className="HrProfile_up_in_right">
              <div className="HrProfile_up_in_right1">
                <div className="HrProfile_up_in_right_small">
                  <div className="HrProfile_up_in_right_small_in1">
                    Email
                  </div>
                  <div className="HrProfile_up_in_right_small_in2">
                    {curuser.email}
                  </div>
                </div>
                <div className="HrProfile_up_in_right_small">
                  <div className="HrProfile_up_in_right_small_in1">
                    Date of Birth
                  </div>
                  <div className="HrProfile_up_in_right_small_in2">
                    {new Date(curuser.dateOfBirth).toLocaleDateString()}
                  </div>
                </div>
                <div className="HrProfile_up_in_right_small">
                  <div className="HrProfile_up_in_right_small_in1">Mobile</div>
                  <div className="HrProfile_up_in_right_small_in2">
                    {curuser.Mobile_No}
                  </div>
                </div>
                <div className="HrProfile_up_in_right_small">
                  <div className="HrProfile_up_in_right_small_in1">Address</div>
                  <div className="HrProfile_up_in_right_small_in2">
                    {curuser.Address}
                  </div>
                </div>
              </div>
              <div className="HrProfile_up_in_right1">
                <div className="HrProfile_up_in_right_small">
                  <div className="HrProfile_up_in_right_small_in1">Role</div>
                  <div className="HrProfile_up_in_right_small_in2">
                    {curuser.quarter[curuser.quarter.length - 1].designation}
                  </div>
                </div>
                <div className="HrProfile_up_in_right_small">
                  <div className="HrProfile_up_in_right_small_in1">
                    Employee Id
                  </div>
                  <div className="HrProfile_up_in_right_small_in2">
                    {curuser.empId}
                  </div>
                </div>
                <div className="HrProfile_up_in_right_small">
                  <div className="HrProfile_up_in_right_small_in1">Group</div>
                  <div className="HrProfile_up_in_right_small_in2">
                    {curuser.quarter[curuser.quarter.length - 1].group}
                  </div>
                </div>
                <div className="HrProfile_up_in_right_small">
                  <div className="HrProfile_up_in_right_small_in1">
                    Onboarding Date
                  </div>
                  <div className="HrProfile_up_in_right_small_in2">
                    {new Date(curuser.dateOfEntryInCdac).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="HrCards_down">
            <div className="Total_Employee" onClick={handle_totalemp}>
              <span className="EmployeeIcon">
                <IoIosPeople />
              </span>
              <span>Total Employee</span>
              <span>{len?.[0]}</span>
            </div>
            <div className="Total_Employee" onClick={handle_APAR_issued}>
              <span className="EmployeeIcon">
                <IoIosCloudDone />
              </span>
              <span>APAR Issued</span>
              <span>{len?.[1]} </span>
            </div>
            <div className="Total_Employee" onClick={handle_APAR_tobeIssued}>
              <span className="EmployeeIcon">
                <MdPendingActions />
              </span>
              <span>APAR to be Issued</span>
              <span>{len?.[2]}</span>
            </div>
            <div className="Total_Employee" onClick={handle_Self_Appraisal}>
              <span className="EmployeeIcon">
                <MdPendingActions />
              </span>
              <span>Self Appraisal filled by Employee</span>
              <span>{len?.[3]}</span>
            </div>
            <div
              className="Total_Employee"
              onClick={handle_Evaluation_completed}
            >
              <span className="EmployeeIcon">
                <BiTask />
              </span>
              <span>Evaluation Completed</span>
              <span>{len?.[4]}</span>
            </div>
          </div>
        </div>
      ) : (
        <span class="loader1"></span>
      )}
    </>
  );
};
