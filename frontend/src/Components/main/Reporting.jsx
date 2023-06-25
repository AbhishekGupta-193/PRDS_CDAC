import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useNavigate } from "react-router-dom";
import "./Reporting.css";

export const Reporting = () => {
  const { user, setuser, curuser, setcuruser , setCurEmp} = useGlobalContext();
  const navigate = useNavigate();
  const [usersForEvaluation,setusersForEvaluation] = useState([]);


  const getData = async () => {
    try {
      setcuruser(JSON.parse(localStorage.getItem("curuser")));
      setusersForEvaluation(JSON.parse(localStorage.getItem("usersForEvaluation")));
     
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
      getData();  
  }, []);

  useEffect(() => {
    getUserForReporting();
    
  }, []);

  const getUserForReporting = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/getUsers");
      setuser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const EvaluationFormHandler = (User) => {
       setCurEmp(User);
       localStorage.setItem("CurEmp",JSON.stringify(User))
       console.log(User);
    navigate("/form/Evaluation");
  };

  useEffect(() => {
    const Reporting_emp = user.filter(
      (user) =>
        user.APAR_status === true &&
        user.SelfAppraisal_status === true &&
        curuser.email === user.groupHead
    );
    
    setusersForEvaluation(Reporting_emp)
    localStorage.setItem("usersForEvaluation", JSON.stringify(usersForEvaluation));

  
  }, [user,curuser]);
  console.log(usersForEvaluation);

  return (
    <div className="Reporting_Section">
    {curuser?.Role.Reporting_Officer && (
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
    )}
  </div>
  );
};
