import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { SiFormstack } from "react-icons/si";
import "../../css/side-bar.css";

export const SideBar = () => {
  const [active, setActive] = useState("employee");

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
        className={`sidebar-item ${active === "reporting" ? "active" : ""}`}
        to="Reporting"
        onClick={() => setActive("Reporting")}
      >
        <i>
          <SiFormstack />
        </i>
        <span>Reporting</span>
      </Link>
    </aside>
  );
};
