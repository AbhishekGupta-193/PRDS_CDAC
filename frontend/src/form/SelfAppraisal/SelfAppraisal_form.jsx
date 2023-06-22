// import React, { useState } from 'react'
// import "./SelfAppraisal_form.css"


// const SelfAppraisalForm = () => {
//     const [userregistration, setuserregistration] = useState({
//         username: "",
//         EmployeeID: "",
//         SelfAppraisalPeriod_from: "",
//         SelfAppraisalPeriod_to: "",
//         ProjectName: "",
//         EmailID: "",
//         CurrentResponsiblities: "",
//         JobAsssigned: "",
//         SpecificAchievementByTheEmployee: "",
//         SingnatureOfEmployee: "",
//         Date: ""

//     });
//     const [records, setRecords] = useState([]);
//     const handleInput = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         console.log(name, value);

//         setuserregistration({ ...userregistration, [name]: value })
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newRecord = { ...userregistration, id: new Date().getTime().toString() }
//         console.log(records);
//         setRecords([...records, newRecord]);
//         console.log(records);
//     }
//     return (
//         <>
//             <form className='container2' action="" onSubmit={handleSubmit}>
//                 {/* <form className='container' onSubmit={handleSubmit}> */}
//                 <div className='heading'>
//                     <h1>Self Appraisal Form</h1>               </div>
//                 <div>
//                     <label htmlFor="username"></label>
 

//                     <input type="text" placeholder='Name Of Employee' autoComplete="off" className='inp'
//                         value={userregistration.username}
//                         onChange={handleInput}
//                         name="username" id="username" />

//                 </div>
//                 <div className='row1'>
//                     <div className='emp_id'>
//                         <div className='title_empid'><span>Employee Id :</span></div>
//                 <div>
//                     <label htmlFor="EmployeeID"></label>
//                     <input type="text" placeholder='Employee ID' autoComplete="off" className='inp1'
//                         value={userregistration.EmployeeID}
//                         onChange={handleInput}

//                         name="EmployeeID" id="EmployeeID" />
//                 </div>
//                 </div>
//                 <div className='pos'>
//                     <div className='title_pos'><span>Position :</span></div>
//                 <div>
//                     <label htmlFor="Position"></label>
//                     <input type="text" placeholder='Position' autoComplete="off" className='inp1'
//                         value={userregistration.position}
//                         onChange={handleInput}
//                         name="Position" id="Position" />
//                 </div>
//                 </div>
//                 </div>
//                 <div className='row2'>
//                     <div className='title_saf'><span>Self  Appraisal  Period :</span></div>
//                 <div className='period_saf'>
//                     <label htmlFor="SelfAppraisalPeriod_from"></label>

//                     <input type="text" placeholder='FROM : DD / MM / YYYY' autoComplete="off" className='inp'
//                         value={userregistration.SelfAppraisalPeriod_from}
//                         onChange={handleInput}
//                         name="SelfAppraisalPeriod_from" id="SelfAppraisalPeriod_from" />
//                 </div>
//                 <div>
//                     <label htmlFor="SelfAppraisalPeriod_to"></label>
//                     <input type="text" placeholder='TO : DD / MM / YYYY' autoComplete="off" className='inp'
//                         value={userregistration.SelfAppraisalPeriod_to}
//                         onChange={handleInput}
//                         name="SelfAppraisalPeriod_to" id="SelfAppraisalPeriod_to" />
//                 </div>
//                 </div>
//                 <div>
//                     <label htmlFor="ProjectName"></label>
//                     <input type="text" placeholder='Project Name' autoComplete="off" className='inp'
//                         value={userregistration.ProjectName}
//                         onChange={handleInput}
//                         name="ProjectName" id="ProjectName" />
//                 </div>
//                 <div>
//                     <label htmlFor="EmailID"></label>
//                     <input type="text" placeholder='Email ID' autoComplete="off" className='inp'
//                         value={userregistration.EmailID}
//                         onChange={handleInput}
//                         name="EmailID" id="EmailID" />
//                 </div>
//                 <div>
//                     <label htmlFor="CurrentResponsiblities"></label>
//                     <input type="text" placeholder='Current Responsiblities' autoComplete="off" className='inp'
//                         value={userregistration.CurrentResponsiblities}
//                         onChange={handleInput}
//                         name="CurrentResponsiblities" id="CurrentResponsiblities" />
//                 </div>
//                 <div className='row'>
              
//                     <div>
//                         <label htmlFor="JobAsssigned"></label>
//                         <span>Job Asssigned</span>
//               <textarea
//                 name="JobAsssigned"
//                 id="JobAsssigned"
//                 cols="30"
//                 rows="10"
//                 placeholder="Job Asssigned"
//                 className='inp'
//                 value={userregistration.JobAsssigned}
//                             onChange={handleInput}
//               ></textarea>

//                     </div>
//                     <div>
//                         <label htmlFor="SpecificAchievementByTheEmployee"></label>
//                         <span>Specific Achievement</span>
//               <textarea
//                 name="SpecificAchievementByTheEmployee"
//                 id="SpecificAchievementByTheEmployee"
//                 cols="30"
//                 rows="10"
//                 placeholder="Specific  Achievement  By  The Employee ..."
//                 className='inp'
//                 value={userregistration.SpecificAchievementByTheEmployee}
//                             onChange={handleInput}
//               ></textarea>
                       
                 
//                 </div>
//                 </div>
//                 <div className='row4'>
//                     <div className='sign'>
//                         <div className='title_sign'><span>Signature :</span></div>
//                     <div>

//                         <label htmlFor="SingnatureOfEmployee"></label>
//                         <input type="text" placeholder='Singnature Of  Employee' autoComplete="off" className='inp'
//                             value={userregistration.SingnatureOfEmployee}
//                             onChange={handleInput}
//                             name="SingnatureOfEmployee" id="SingnatureOfEmployee" />
//                     </div>
//                     </div>
//                     <div className='date'>
//                         <div className='title_date'><span>Date :</span></div>
//                     <div>
//                         <label htmlFor="Date"></label>
//                         <input type="date" placeholder='Date' autoComplete="off" className='inp'
//                             value={userregistration.Date}
//                             onChange={handleInput}
//                             name="Date" id="Date" />
//                     </div>
//                     </div>
//                 </div>

//                 <button type="submit" className='submitbtn' >Submit</button>
//             </form>
//         </>
//     )
// }

// export default SelfAppraisalForm