import {React} from 'react'
import '../../css/notes.css'
import { Link, useNavigate } from 'react-router-dom';

export const RPO = () => {
  const navigate = useNavigate();
   
  return (
    <div className='notes-wrapper'>
       <button onClick={()=>{
        console.log("selfappraisal");
        navigate('/form/Evaluation');
      }}>Fill the Self Appraisal form</button>
        RPO      
    </div>
  )
}