import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Reporting.css";

export const Reporting = () => {
  const { user, setuser, curuser } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    getUserForReporting();
  }, []);

  const getUserForReporting = async () => {
    const { data } = await axios.get("http://localhost:5000/getUsers");
    setuser(data);
    console.log(data);
  };

  const EvaluationFormHandler = () => {
    navigate("/form/Evaluation");
  };

  const usersWithStatus = user.filter(
    (user) => user.APAR_status === true && user.SelfAppraisal_status === true
  );

  return (
    <div className="Reporting_Section">
      {curuser.Role.Reporting_Officer && (
        <>
          <p>Hello, I'm reporting officer</p>
          {usersWithStatus.map((user) => (
            <div key={user._id}>
              <p>Email: {user.email}</p>
              <p>Username: {user.userName}</p>
              <button onClick={EvaluationFormHandler}>
                Fill Evaluation form
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
