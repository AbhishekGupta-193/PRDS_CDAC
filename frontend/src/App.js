import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Evaluation_form } from "./Components/form/Evaluation/Evaluation_form";
import Login from "./Components/LoginPage/Login";
import { Main } from "./Components/main/Main";
import { Main2 } from "./Components/main2/Main2";
import { HR } from "./Components/main2/HR";
import APAR_form from "./Components/form/APAR/APAR_form";
import SelfAppraisalForm from "./Components/form/SelfAppraisal/SelfAppraisalForm";
import LandingPage from "./Components/LandingPage/LandingPage";
import {LandingHRMIS} from "./Components/LandingPage/LandingHRMIS";
import { Reporting } from "./Components/main/Reporting";
import { EmployeeSection } from "./Components/main/EmployeeSection";
import Analytics from "./Components/main2/Analytics";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/LandingPage" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="main" element={<Main />}>
            <Route path="EmployeeSection" element={<EmployeeSection />} />
            <Route path="Reporting" element={<Reporting />} />
          </Route>
          <Route path="main2" element={<Main2 />}>
            <Route path="HR" element={<HR />} />
            <Route path="Analytics" element={<Analytics />} />
          </Route>

          <Route path="/form/selfappraisal" element={<SelfAppraisalForm />} />
          <Route path="/form/APAR" element={<APAR_form />} />
          <Route path="/form/Evaluation" element={<Evaluation_form />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/LandingHRMIS" element={<LandingHRMIS />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
