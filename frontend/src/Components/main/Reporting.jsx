import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useNavigate } from "react-router-dom";
import "./Reporting.css";

export const Reporting = () => {
  const { user, setuser, curuser, setcuruser, setCurEmp, loading } =
    useGlobalContext();
  const navigate = useNavigate();
  const [usersForEvaluation, setusersForEvaluation] = useState([]);
  // var usersForEvaluation = [];

  const getuserforreporting = () => {
    console.log(
      usersForEvaluation,
      " User for reporting ",
      curuser,
      "Cur User",
      user,
      "Total user array"
    );
      const Reporting_emp = user.filter((userData) => {
        const lastQuarter = userData.quarter[userData.quarter.length - 1]; 
        return (
          lastQuarter.APAR_status === true &&
          lastQuarter.SelfAppraisal_status === true &&
          lastQuarter.groupHead_email ===  curuser.email
        );
      });
      
      setusersForEvaluation(Reporting_emp);
    
  };
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
  useEffect(() => {
    getData();
    getuserforreporting();
  }, [user]);


  const EvaluationFormHandler = (User) => {
    setCurEmp(User);

    navigate("/form/Evaluation");
  };

  return (
    <>
      {!loading ? (
        <div className="Reporting_Section">
          {curuser?.Role.Reporting_Officer ? (
            <>
              <p>Evaluation request for </p>
              {usersForEvaluation ? (
                usersForEvaluation.map((user) => (
                  <div key={user._id}>
                    <p>Name: {user.userName}</p>
                    <button onClick={() => EvaluationFormHandler(user)}>
                      Fill Evaluation form
                    </button>
                  </div>
                ))
              ) : (
                <p>No users for evaluation.</p>
              )}
            </>
          ) : (
            "You don't have any access to view this page"
          )}
        </div>
      ) : (
        "Loading the data"
      )}
    </>
  );
};
