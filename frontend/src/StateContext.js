import axios from "axios";

import { useContext, useEffect } from "react";
import React, { useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [filteredarray, setfilteredarray] = useState(null);
  var [curuser, setcuruser] = useState(null);
  const [loading,setloading] = useState(false);
  const getusers = async () => {
    setloading(true)
    const { data } = await axios.get("https://prds.onrender.com/getUsers");
    const allemp = data.filter((element)=>element.Role.HR === false)
    setfilteredarray(allemp)
    setuser(allemp);
    setloading(false)
    console.log(data);
  };
  const [isSubmitted, setisSubmitted] = useState(false);
  const contextValue = {
    isSubmitted,
    setisSubmitted,
  };


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
        curuser,
        setcuruser,
        contextValue,
        CurEmp,
        setCurEmp,
        loading,
        filteredarray,
        setfilteredarray   

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
