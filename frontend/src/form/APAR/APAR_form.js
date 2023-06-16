import React, { useEffect, useState, useContext } from 'react'
import './APAR_form.css'
import StateContext from '../../StateContext.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function APAR_Form() {
    const navigate = useNavigate();
    const { empReq, requserId } = useContext(StateContext);
    const [curUser, setCurUser] = useState(empReq[requserId]);
    console.log(curUser);
    // const [flag, setFlag] = useState(true);

    // useEffect(() => {
    //     console.log("Submitted Successfully")
    //     console.log(flag);
    // }, [flag])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurUser({
            ...curUser,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/submitAparForm", curUser)
            .then(res => {
                // console.log(res.data);
                // alert("data added");
                // setUser(res.data);
                empReq[requserId] = res.data;
                navigate("/HrDashboard ");
                // console.log(user);
            })

        // if (!curUser.from || !curUser.upto || !curUser.name || !curUser.emp_id || !curUser.dob || !curUser.designation || !curUser.pay || !curUser.grp || !curUser.entrydate || !curUser.date || !curUser.leave) {
        //     alert("All fields are mandatory")
        // }
        // else {
        //     setFlag(true)
        // }
    }
    return (

        <>
            {/* {<pre>
                {(flag) ?
                    alert("Submitted dude")
                    < h2 className='ui-define'>Hello {curUser.name}, You,ve Submitted Successfully</h2>
                    : ""
                    }
        </pre > */}
            <form className='container_apar' onSubmit={handleSubmit}>
                <div className='heading'>
                    <h1>APAR Management Form</h1>
                </div>
                <div className='period'>
                    <div className='title'><span>Report for the Period :</span></div>
                    <div className='content'>
                        <div className='from'><input type='text' placeholder='FROM : DD / MM / YYYY'
                            name="Aparfrom" value={curUser.Aparfrom} onChange={handleChange} className="inp" ></input>
                        </div>
                        <div className='upto'><input type='text' placeholder='TO : DD / MM / YYYY'
                            name="Aparupto" value={curUser.Aparupto} onChange={handleChange} className="inp"></input>

                        </div>
                    </div>
                </div>
                <div className='personal_deatils'>
                    <div>
                        <input type='text' placeholder='Name'
                            name="username" value={curUser.username} onChange={handleChange} className="inp"></input>
                    </div>
                    <div>
                        <input type='text' placeholder='Employee Id'
                            name="EmployeeID" value={curUser.EmployeeID} onChange={handleChange} className="inp"></input>
                    </div>
                    <div>
                        <input type='text' placeholder='Date of birth'
                            name="dob" value={curUser.dob} onChange={handleChange} className="inp"></input>
                    </div>
                    <div>
                        <input type='text' placeholder='Designation'
                            name="designation" value={curUser.designation} onChange={handleChange} className="inp"></input>
                    </div>
                    <div>
                        <input type='text' placeholder='Present Pay'
                            name="pay" value={curUser.pay} onChange={handleChange} className="inp"></input>
                    </div>
                    <div>
                        <input type='text' placeholder='Section/Group'
                            name="grp" value={curUser.grp} onChange={handleChange} className="inp"></input>
                    </div>
                    <div>
                        <input type='text' placeholder='Date of entry in C-DAC : DD / MM / YYYY'
                            name="entrydate" value={curUser.entrydate} onChange={handleChange} className="inp"></input>
                    </div>
                    <div>
                        <input type='text' placeholder='Date of entry to the current designation'
                            name="Apardate" value={curUser.Apardate} onChange={handleChange} className="inp"></input>
                    </div>
                    <div>
                        <input type='text' placeholder='Leave availed'
                            name="leave" value={curUser.leave} onChange={handleChange} className="inp"></input>
                    </div>
                    <div>
                        <input type='text' placeholder='Absence from duty other then leave'
                            name="otherleave" value={curUser.otherleave} onChange={handleChange} className="inp"></input>
                    </div>
                </div>
                <div className='btn_class'>
                    <button type='submit' className='submitbtn_apar' >submit</button>
                </div>
            </form>
        </>
    )
}

export default APAR_Form