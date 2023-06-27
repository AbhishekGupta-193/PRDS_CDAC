import '../../css/notes.css'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useGlobalContext } from '../../StateContext';
import {IoIosPeople} from 'react-icons/io'


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
  const [rows, setRows] = useState(JSON.parse(localStorage.getItem("allusers")));

   
  const addRow = () => {
    setRows([...rows, {}]);
  };
 
  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };
  useEffect(() => {
 
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
      <div className='Total_Employee'>
           <span className='EmployeeIcon'><IoIosPeople/></span>
           <span>Total Employee are : </span>
      </div>
        <div>
      {/* <button onClick={addRow}>Add Row</button> */}
      <div className="main1"> 
      <table className="dashboard-table">
        <thead>
          <tr>
          <th>Sl.No</th>
            <th>Employee id</th>
            <th>Group</th>
            <th>To be Issue date</th>
            <th>To be Completion date by employee
            </th>
            <th>To be Completion date by Reporting</th>
            <th>Status of completion by employee</th>
            <th>Status of Completion by Reporting</th>
            <th>Form</th>
             
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><input type='text'></input> </td>
              <td><input type='text'></input> </td>
              <td> <input type='date'></input></td>
              <td><input type='date'></input></td>
              <td><input type='date'></input></td>
              <td><input type='text'></input></td>
              <td><input type='text'></input></td>
              <td>  <button onClick={btnhandler}>APAR</button></td>
  
              {/* <td>
                <button onClick={() => deleteRow(index)}>Delete</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
       <div className="container">
        <div className="card">
          <h2>Welcome</h2>
          <div className="action">
            <button onClick={btnhandler}>APAR</button>
          </div>
        </div>
      </div>  
    </div>
  )
}