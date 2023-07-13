import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { SiFormstack } from "react-icons/si";
import { FaChartLine } from "react-icons/fa";
import "../../css/side-bar.css";
import axios from "axios";

import { useGlobalContext } from "../../StateContext.js";
import { BASE_URL } from "../Config";

export const SideBar = () => {
  const [active, setActive] = useState("employee");
  const { curuser, setcuruser } = useGlobalContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const empId = JSON.parse(localStorage.getItem("empId"));
        const { data } = await axios.post(BASE_URL + "getCurUser", {
          empId,
        });
        setcuruser(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (!curuser) {
      getData();
    }
  }, []);

  return (
    <aside className="side-bar">
      <Link
        className={`sidebar-item ${active === "employee" ? "active" : ""}`}
        to="EmployeeSection"
        onClick={() => setActive("EmployeeSection")}
      >
        <i>
          <FaUserAlt />
        </i>
        <span>Employee</span>
      </Link>

      <Link
        className={`sidebar-item ${active === "analytics" ? "active" : ""}`}
        to="Analytics"
        onClick={() => setActive("Analytics")}
      >
        <i>
          <FaChartLine />
        </i>
        <span>Analytics</span>
      </Link>
      {curuser && (curuser.Role.Reporting_Officer || curuser.Role.SLA) &&
        <Link
        className={`sidebar-item ${active === "reporting" ? "active" : ""}`}
        to="Reporting"
        onClick={() => setActive("Reporting")}
      >
        <i>
          <SiFormstack />
        </i>
        <span>Reporting</span>
      </Link>
      }
    </aside>
  );
};
