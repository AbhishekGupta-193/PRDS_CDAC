import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {Evaluation_form} from './Components/form/Evaluation/Evaluation_form';
import Login from './Components/LoginPage/Login';
import { Main } from "./Components/main/Main";
import { Main2 } from "./Components/main2/Main2";
import { Main3 } from "./Components/main3/Main3";
import { Employee } from "./Components/main/Employee";
import { HR } from "./Components/main2/HR";
import { RPO } from "./Components/main3/RPO";
import APAR_form from './Components/form/APAR/APAR_form';
import SelfAppraisalForm from './Components/form/SelfAppraisal/SelfAppraisal_form'
import LandingPage from './Components/LandingPage/LandingPage'

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/Login" />} />
            <Route path="/Login" element={<Login/>} />
            <Route path="main" element={<Main />}>
            <Route path="employee" element={<Employee />} />
          </Route>
          <Route path="main2" element={<Main2 />}>
            <Route path="HR" element={<HR />} />
          </Route>

          <Route path="main3" element={<Main3 />}>
            <Route path="RPO" element={<RPO />} />
          </Route>
          <Route path="/form/selfappraisal" element={<SelfAppraisalForm/>} />
          <Route path="/form/APAR" element={<APAR_form/>} />
          <Route path="/form/Evaluation" element={<Evaluation_form/>} />
          <Route path="/LandingPage" element={<LandingPage/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
