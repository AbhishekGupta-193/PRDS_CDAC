import axios from "axios";

import { useContext, useEffect } from "react";
import React, { useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  var [curuser, setcuruser] = useState(null);
  const [loading,setloading] = useState(false);
  const getusers = async () => {
    setloading(true)
    const { data } = await axios.get("http://localhost:5000/getUsers");
    setuser(data);
    setloading(false)
    console.log(data);
  };
  const [isSubmitted, setisSubmitted] = useState(false);
  const contextValue = {
    isSubmitted,
    setisSubmitted,
  };
  const TotalEmployee = user
  const APAR_issued = user?.filter((element) => (element.Role.HR === false && element.APAR_status === true))
  const APAR_not_initiated = user?.filter((element) => (element.Role.HR === false && element.APAR_status === false));
  const APAR_completed = user?.filter((element) => (element.Role.HR === false && element.APAR_status === true && element.SelfAppraisal_status === true && element.Evalutation_status === true));
  const Self_Appraisal_filled = user?.filter((element) => (element.Role.HR === false && element.APAR_status === true && element.SelfAppraisal_status === true));

  const [alluser, setalluser] = useState(null);
  const [ CurEmp,setCurEmp ] = useState(null);
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
        setCurEmp,
        loading,
        TotalEmployee,
        APAR_not_initiated,
        APAR_completed,
        Self_Appraisal_filled,
        APAR_issued

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
