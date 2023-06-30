import axios from "axios";

import { useContext, useEffect } from "react";
import React, { useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setuser] = useState([]);
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
  const [alluser, setalluser] = useState(null);
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
        setCurEmp,
        loading
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
