import React, { useEffect, useState, useContext } from "react";
import "./APAR_form.css";
// import StateContext from "../../../StateContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../StateContext";

function APAR_form() {
  const navigate = useNavigate();
    // const { user, setuser } = useGlobalContext();
    const [user,setuser] = useState({
        appraiselPeriodFrom : "",
        appraiselPeriodTo : "",
        userName:"",
        empId:"",
        dateOBirth:"",
        designation : "",
        presentpay : "",
        dateOfEntryInCdac: "",
        absenceOtherThanLeave: "",
        leaveAvailed: "",
        dateOfFillingAparForm: "",
        group : ""
    })
  const {alluser, setalluser} =  useGlobalContext();
//   console.log(user);
//     const [curUser, setCurUser] = useState(empReq[requserId]);
//   console.log(curUser);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
      console.log("Submitted Successfully")
      console.log(flag);
  }, [flag])
console.log({...user});


  const  handleSubmit =  (e) =>{
    e.preventDefault();
    console.log({user});
     axios.post("http://localhost:5000/submitAparForm",user).then(response => {
        console.log('Request sent successfully');
      })
      .catch(error => {
        console.error('Error sending request:', error);
      }); 
  }
  return (
    <>

      <form className="container_apar" onSubmit={handleSubmit}>
        <div className="head">
          <h3>APAR Management : Employee details</h3>
        </div>
        <div className="period">
          <div className="title">
            <span>Report for the Period :</span>
          </div>
          <div className="content">
            <div className="from">
              <input
                type="text"
                placeholder="FROM : DD / MM / YYYY"
                name="Aparfrom"
                value={user.appraiselPeriodFrom}
                onChange={(e)=>setuser({...user,appraiselPeriodFrom : e.target.value})}
                className="inpt"
              ></input>
            </div>
            <div className="upto">
              <input
                type="text"
                placeholder="TO : DD / MM / YYYY"
                name="Aparupto"
                value={user.appraiselPeriodTo}
                onChange={(e)=>setuser({...user,appraiselPeriodTo: e.target.value})}
                className="inpt"
              ></input>
            </div>
          </div>
        </div>
        <div className="personal_deatils">
          <div className="Table_rows">
            <span>Name :</span>
            <input
              type="text"
              placeholder="Name"
              name="username"
                value={user.userName}
              onChange={(e)=>setuser({...user,userName : e.target.value})}
              className="inpt"
            ></input>
          </div>
          <div className="Table_rows">
            <span>Employee Id :</span>
            <input
              type="text"
              placeholder="Employee Id"
              name="EmployeeID"
                value={user.empId}
              onChange={(e)=>setuser({...user,empId : e.target.value})}
              className="inpt"
            ></input>
          </div>
          <div className="Table_rows">
            <span>Date of Birth :</span>

            <input
              type="text"
              placeholder="Date of birth"
              name="dob"
                value={user.dateOBirth}
              onChange={(e)=>setuser({...user,dateOBirth : e.target.value})}
              className="inpt"
            ></input>
          </div>
          <div className="Table_rows">
            <span>Designation :</span>

            <input
              type="text"
              placeholder="Designation"
              name="designation"
                value={user.designation}
              onChange={(e)=>setuser({...user,designation : e.target.value})}
              className="inpt"
            ></input>
          </div>
          <div className="Table_rows">
            <span>Present Pay :</span>

            <input
              type="text"
              placeholder="Present Pay"
              name="pay"
                value={user.presentpay}
              onChange={(e)=>setuser({...user,presentpay : e.target.value})}
              className="inpt"
            ></input>
          </div>
          <div className="Table_rows">
            <span>section/Group :</span>
            <input
              type="text"
              placeholder="Section/Group"
              name="grp"
                value={user.group}
              onChange={(e)=>setuser({...user,group : e.target.value})}
              className="inpt"
            ></input>
          </div>
          <div className="Table_rows">
            <span>Date of entry in CDAC :</span>
            <input
              type="text"
              placeholder=" DD / MM / YYYY"
              name="entrydate"
                value={user.dateOfEntryInCdac}
              onChange={(e)=>setuser({...user,dateOfEntryInCdac: e.target.value})}
              className="inpt"
            ></input>
          </div>
          <div className="Table_rows">
            <span>Date of entry to the current designation :</span>
            <input
              type="text"
              placeholder="Date of entry to the current designation"
              name="Apardate"
                value={user.dateOfFillingAparForm}
              onChange={(e)=>setuser({...user,dateOfFillingAparForm: e.target.value})}
              className="inpt"
            ></input>
          </div>
          <div className="Table_rows">
            <span>Leave availed :</span>
            <input
              type="text"
              placeholder="Leave availed"
              name="leave"
                value={user.leaveAvailed}
              onChange={(e)=>setuser({...user,leaveAvailed: e.target.value})}
              className="inpt"
            ></input>
          </div>
          <div className="Table_rows">
            <span>Absence from duty other then leave :</span>
            <input
              type="text"
              placeholder="Absence from duty other then leave"
              name="otherleave"
                value={user.absenceOtherThanLeave}
              onChange={(e)=>setuser({...user,absenceOtherThanLeave: e.target.value})}
              className="inpt"
            ></input>
          </div>
        </div>
        <div className="btn_class">
          <button type="submit" className="submitbtn_apar">
            submit
          </button>
        </div>
      </form>
    </>
  );
}

export default APAR_form;
