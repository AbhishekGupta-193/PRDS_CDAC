// import React from 'react';

// const StateContext = React.createContext();

// export default StateContext;

import axios from "axios";
import { useContext, useEffect } from "react";
import React, { useState } from 'react'

const AppContext = React.createContext();

const AppProvider = ({children}) =>{
    const [user, setuser] = useState({
    
        // email: "",
        // password: "",
        // userName: "",
        // empId: "",
        // dateOfBirth: "",
        // designation: "",
        // presentPay: "",
        // group: "",
        // groupHead: "",
        // dateOfEntryInCdac: "",
        // dateOfEntryToCurrentDesignation: "",
        // leaveAvailed: "",
        // absenceOtherThanLeave: "",
        // appraiselPeriodFrom: "",
        // appraiselPeriodTo: "",
        // projectName: "",
        // selfAppFormData1: [
        //   {
        //     jobAssigned: "",
        //     serialNumber: "",
        //     achievement: ""
        //   },
        //   {
        //     jobAssigned: "",
        //     serialNumber: "",
        //     achievement: ""
        //   }
        // ],
        // selfAppFormData2: [
        //   {
        //     achievement: "",
        //     deliverables: ""
        //   }
        // ],
        // dateOfFillingAparForm: "",
        // dateOfFillingSelfAppraisalForm: "",
        // dateOfFillingEvaluationForm: "",
        // scoreOfEvaluation: {
        //   sc1: "",
        //   sc2: "",
        //   sc3: "",
        //   sc4: "",
        //   sc5: "",
        //   sc6: "",
        //   selfAppraisalScore: "",
        //   achievementBeyondScore: "",
        //   totalScore: ""
        // },
        // additionalComments: ""
  
    })
    const getusers = async ()=>{
        const {data} =  await axios.get("http://localhost:5000/getUsers")
        setuser(data);
        console.log(data);

    }
    
    const [alluser, setalluser] = useState([]);
    const [empReq, setEmpReq] = useState([]);
    const [requserId, setReqUserId] = useState();
    useEffect(()=>{
        getusers();
    },[])
     return <AppContext.Provider value={{

        user, setuser, empReq, setEmpReq, requserId, setReqUserId ,alluser,setalluser
     }}>
          {children}
     </AppContext.Provider>
}

const useGlobalContext = () =>{
     return useContext(AppContext)
}

export {AppContext,AppProvider, useGlobalContext}





