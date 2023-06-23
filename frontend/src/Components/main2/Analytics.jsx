import React, { useEffect } from "react";
import { useGlobalContext } from "../../StateContext";
import "../../css/analytics.css";
import axios from "axios";

const Analytics = () => {
  const { curuser, setcuruser, user, setuser } = useGlobalContext();
  console.log(curuser);

  useEffect(() => {
    getCurUser();
    getAllEmp();
  }, []);

  const getAllEmp = async () => {
    try {
      const storedusers = JSON.parse(localStorage.getItem("allusers"));
      if (storedusers) {
        setuser(storedusers);
        console.log(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCurUser = () => {
    try {
      const storedCurUser = JSON.parse(localStorage.getItem("curuser"));
      if (storedCurUser) {
        setcuruser(storedCurUser);
        console.log(curuser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {curuser && curuser.Role.HR && (
        <div className="tc">
          <table className="tb">
            <caption className="cp">EMPLOYEE's PERFORMANCE</caption>
            <thead className="sticky-header">
              <tr className="trr">
                <th className="thh">Emp ID</th>
                <th className="thh">Name</th>
                <th className="thh">Self Appraisal</th>
                <th className="thh">Achievement Beyond Normal Scope Of Work</th>
                <th className="thh">Reporting Officer Score</th>
                <th className="thh">Overall Performance</th>
              </tr>
            </thead>
            <tbody>
              {user ? (
                user.map((user, index) => (
                  <tr className="trr" key={index}>
                    <td className="tdd">{user.empId}</td>
                    <td className="tdd">{user.userName}</td>
                    <td className="tdd">
                      {user.scoreOfEvaluation.selfAppraisalScore}
                    </td>
                    <td className="tdd">
                      {user.scoreOfEvaluation.achievementBeyondScore}
                    </td>
                    <td className="tdd">
                      {user.scoreOfEvaluation.sc1 +
                        user.scoreOfEvaluation.sc2 +
                        user.scoreOfEvaluation.sc3 +
                        user.scoreOfEvaluation.sc4 +
                        user.scoreOfEvaluation.sc5 +
                        user.scoreOfEvaluation.sc6}
                    </td>
                    <td className="tdd">
                      {user.scoreOfEvaluation.totalScore < 40
                        ? "Need Improvement"
                        : user.scoreOfEvaluation.totalScore < 60
                        ? "Satisfactory"
                        : user.scoreOfEvaluation.totalScore < 80
                        ? "Good"
                        : "Excellent"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Analytics;
