import "../../css/notes.css";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../StateContext";
import { IoIosPeople } from "react-icons/io";
import { GrDocumentPerformance } from "react-icons/gr";
import { MdPendingActions } from "react-icons/md";
import { AiOutlineIssuesClose } from "react-icons/ai";

export const HR = () => {
  const navigate = useNavigate();
  const { user, loading } = useGlobalContext();

  const TotalEmployee = user?.length
  const APAR_issued = user?.filter((element) => (element.Role.HR === false && element.APAR_status === true)).length;
  const APAR_pending = user?.filter((element) => (element.Role.HR === false && element.APAR_status === false)).length;
  const APAR_completed = user?.filter((element) => (element.Role.HR === false && element.APAR_status === false && element.SelfAppraisal_status === false && element.Evalutation_status === false)).length;

  return (
    <>
      {!loading ? (
        <div className="notes-wrapper">
          <div className="Total_Employee">
            <span className="EmployeeIcon">
              <IoIosPeople />
            </span>
            <span>Total Employee are :  </span>
            <span>{TotalEmployee}</span>
          </div>
          <div className="Total_Employee">
            <span className="EmployeeIcon">
              <GrDocumentPerformance />
            </span>
            <span>Performance Evaluation Completed : </span>
            <span>{APAR_completed}</span>
          </div>
          <div className="Total_Employee">
            <span className="EmployeeIcon">
              <MdPendingActions />
            </span>
            <span>Performance Evaluation Pending :  </span>
            <span>{APAR_pending} </span>
          </div>
          <div className="Total_Employee">
            <span className="EmployeeIcon">
              <AiOutlineIssuesClose />
            </span>
            <span>APAR Issued :  </span>
            <span>{APAR_issued} </span>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};
