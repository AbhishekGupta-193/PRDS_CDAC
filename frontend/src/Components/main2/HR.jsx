import '../../css/notes.css'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import StateContext from '../../StateContext.js';
import axios from 'axios';
import { useGlobalContext } from '../../StateContext';


export const HR = () => {
  const navigate = useNavigate();
  const { user,setuser } = useGlobalContext();
  const {isSubmitted,setisSubmitted} = useGlobalContext();
  console.log(isSubmitted);
  // const [show, setShow] = useState([]);
  const {alluser, setalluser} = useGlobalContext();
  const btnhandler = ()=>{
    navigate('/form/APAR')
  }
  useEffect(() => {
    // axios
    //   .get("http://localhost:5000/getRequests")
    //   .then(({ data }) => {
    //     console.log('data ---> ', data);
    //     setShow(data);
    //   })
    axios
      .get("http://localhost:5000/getUsers")
      .then(({ data }) => {
        console.log(data);
        setalluser(data);
      })
  }, [])
  const fillForrm = () => {
    navigate("/form/APAR");
  }
   
  return (
 
    <div className='notes-wrapper'>
       <div className="container">
        <div className="card">
          <h2>Welcome</h2>
          {/* <p>You have 50 employees in your company.</p> */}
          <div className="action">
            <button onClick={btnhandler}>APAR</button>
            {/* <a href="/">Manage Departments</a> */}
          </div>
        </div>
        {/* <div className="card">
          <h2>Recent Requests</h2>

          {show.map((employee) =>
            <>
              <p>Request from : {employee.email}</p>
              <button onClick={fillForrm}>Fill apprasel form</button>
              <br />
            </>
          )}
        </div> */}
      </div>  
    </div>
  )
}