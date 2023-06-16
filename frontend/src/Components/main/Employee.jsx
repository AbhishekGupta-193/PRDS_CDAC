import React from 'react'
import axios from 'axios'
import StateContext from '../../StateContext.js';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import './Dash1.css'


export const Employee = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(StateContext);

  const generate = () => {
    axios.post("http://localhost:5000/updateRequest", user)
      .then(res => {
        setUser({
          email: res.data.email,
          passwoed: res.data.passwoed,
          request: res.data.request
        });
      })
  }
  const fillForrm = () => {
    navigate("/form/selfappraisal ");
  }

 
   
  return (
    <div className='notes-wrapper'>
    <div className="container">
        <div className="card">
          <h2>Welcome, {user.email}</h2>
          <div className="action">
            <button onClick={generate}>{user.request ? <h4>Request already Done</h4> : <h4>No Request given yet</h4>}</button>
            <br />
            <button onClick={fillForrm}>Fill APAR Management form</button>
          </div>
        </div>
      </div>      
    </div>
  )
}