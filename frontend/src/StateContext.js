import axios from "axios";

import { useContext, useEffect } from "react";
import React, { useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setuser] = useState([]);
  var [curuser, setcuruser] = useState({
    email: "",
    password: "",
    userName: "",
    empId: 0,
    dateOfBirth: "",
    designation: "",
    presentPay: "",
    group: "",
    groupHead: "",
    dateOfEntryInCdac: "'",
    dateOfEntryToCurrentDesignation: "",
    leaveAvailed: "",
    absenceOtherThanLeave: "",
    appraiselPeriodFrom: "",
    appraiselPeriodTo: "",
    projectName: "",
    APAR_status: "",
    SelfAppraisal_status: "",
    Evalutation_status: "",
    Role: {
      HR: "",
      Reporting_Officer: "",
    },
    selfAppFormData1: [
      {
        jobAssigned: "",
        serialNumber: "",
        achievement: "",
      },
    ],
    selfAppFormData2: [
      {
        achievement: "",
        deliverables: "",
      },
    ],
    dateOfFillingAparForm: "",
    dateOfFillingSelfAppraisalForm: "",
    dateOfFillingEvaluationForm: "",
    scoreOfEvaluation: {
      sc1: 0,
      sc2: 0,
      sc3: 0,
      sc4: 0,
      sc5: 0,
      sc6: 0,
      selfAppraisalScore: 0,
      achievementBeyondScore: 0,
      totalScore: 0,
    },
    additionalComments: ""
  });
  const getusers = async () => {
    const { data } = await axios.get("http://localhost:5000/getUsers");
    setuser(data);
    console.log(data);
  };
  const [isSubmitted, setisSubmitted] = useState(false);
  const contextValue = {
    isSubmitted,
    setisSubmitted,
  };
  const [alluser, setalluser] = useState([]);
  const [ CurEmp,setCurEmp ] = useState({});
  useEffect(() => {
    getusers();
  }, []);
  return (
    <AppContext.Provider
      value={{
        user,
        setuser,
        alluser,
        setalluser,
        isSubmitted,
        setisSubmitted,
        curuser,
        setcuruser,
        contextValue,
        CurEmp,
        setCurEmp
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
