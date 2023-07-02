import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Evaluation_form2 } from "./Components/form/Evaluation/Evaluation_form2";
import { Evaluation_form } from "./Components/form/Evaluation/Evaluation_form";
import Login from "./Components/LoginPage/Login";
import { Main } from "./Components/main/Main";
import { Main2 } from "./Components/main2/Main2";
import { HR } from "./Components/main2/HR";
import APAR_form from "./Components/form/APAR/APAR_form";
import SelfAppraisalForm from "./Components/form/SelfAppraisal/SelfAppraisalForm";
import Homescreen_LP from "./Components/LP/Homescreen_LP";
import { Reporting } from "./Components/main/Reporting";
import { EmployeeSection } from "./Components/main/EmployeeSection";
import Analytics from "./Components/main2/Analytics";
import APAR_Track from "./Components/main2/APAR_Track";
import { EmployeeAnalytics } from "./Components/main/EmployeeAnalytics";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/Homescreen_LP" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="main" element={<Main />}>
            <Route path="EmployeeSection" element={<EmployeeSection />} />
            <Route path="Reporting" element={<Reporting />} />
            <Route path="Analytics" element={<EmployeeAnalytics />} />
          </Route>
          <Route path="main2" element={<Main2 />}>
            <Route path="HR" element={<HR />} />
            <Route path="Analytics" element={<Analytics />} />
            <Route path="APAR_Track" element={<APAR_Track />} />
          </Route>

          <Route path="/form/selfappraisal" element={<SelfAppraisalForm />} />
          <Route path="/form/APAR" element={<APAR_form />} />
          <Route path="/form/Evaluation2" element={<Evaluation_form2 />} />
          <Route path="/form/Evaluation" element={<Evaluation_form />} />
          <Route path="/Homescreen_LP" element={<Homescreen_LP />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
