import React, { useState } from "react";
import "./Grid.css"; // Import the CSS file for styling
import { bgcolor } from "@mui/system";

const Grid = ({CurEmp,setCurEmp}) => {
  const [selectedGrid, setSelectedGrid] = useState(null);

   const updateGridStatus = (grid)=>{
    console.log("this is eslected grid" , selectedGrid);
    console.log("this grid" , grid);
    setCurEmp({
      ...CurEmp,
      quarter: [
        ...CurEmp.quarter.slice(
          0,
          CurEmp.quarter.length - 1
        ),
        {
          ...CurEmp.quarter[CurEmp.quarter.length - 1],
          scoreOfEvaluation: {
            ...CurEmp.quarter[CurEmp.quarter.length - 1]
              .scoreOfEvaluation,
              employeeFinalRemark:grid,
            
          },
        },
      ],
    })
  
   }
  const handleMouseclick = (grid) => {
    setSelectedGrid(grid);
    updateGridStatus(grid);
  };

  return (
    <div className="grid-container">
      <div className="grid-item"></div>
      <div
        className={`grid-item ${
          selectedGrid === "Need development" ? "selected" : ""
        }`}
      >
        Need development
      </div>
      <div
        className={`grid-item ${
          selectedGrid === "Meet expectation" ? "selected" : ""
        }`}
      >
        Meet expectation
      </div>
      <div
        className={`grid-item ${
          selectedGrid === "Exceed expectation" ? "selected" : ""
        }`}
      >
        Exceed expectation
      </div>
      <div
        className={`grid-item ${selectedGrid === "High" ? "selected" : ""}`}
      >
        High
      </div>
      <div
        className={`grid-item ${
          selectedGrid === "1c Poor Performance High potential"
            ? "darkyellow"
            : "yellow"
        }`}
        onClick={() => handleMouseclick("1c")}
      >
        <span> 1c </span>
        <span>Poor Performance High potential</span>
      </div>
      <div
        className={`grid-item ${
          selectedGrid === "1b Good performance High potential"
            ? "darkgreen"
            : "green"
        }`}
        onClick={() => handleMouseclick("1b")}
      >
        <span> 1b </span>
        <span>Good performance High potential</span>
      </div>
      <div
        className={`grid-item ${
          selectedGrid === "1a Outstanding performance High potential"
            ? "darkblue"
            : "blue"
        }`}
        onClick={() =>
          handleMouseclick("1a")
        }
      >
        <span> 1a </span>
        <span>Outstanding performance High potential</span>
      </div>
      <div
        className={`grid-item ${selectedGrid === "Moderate" ? "selected" : ""}`}
        onClick={() => handleMouseclick("Moderate")}
      >
        Moderate
      </div>
      <div
        className={`grid-item ${
          selectedGrid === "2c Poor Performance Moderate potential"
            ? "darkorange"
            : "orange"
        }`}
        onClick={() =>
          handleMouseclick("2c")
        }
      >
        <span> 2c </span>
        <span>Poor Performance Moderate potential</span>
      </div>
      <div
        className={`grid-item ${
          selectedGrid === "2b Good performance Moderate potential"
            ? "darkyellow"
            : "yellow"
        }`}
        onClick={() =>
          handleMouseclick("2b")
        }
      >
        <span>2b </span>
        <span> Good performance Moderate potential</span>
      </div>
      <div
        className={`grid-item ${
          selectedGrid === "2a Outstanding performance Moderate potential"
            ? "darkgreen"
            : "green"
        }`}
        onClick={() =>
          handleMouseclick("2a")
        }
      >
        <span> 2a </span>
        <span> Outstanding performance Moderate potential</span>
      </div>
      <div
        className={`grid-item ${selectedGrid === "3a low" ? "selected" : ""}`}
      >
        low
      </div>
      <div
        className={`grid-item ${
          selectedGrid === "3c Poor Performance low potential"
            ? "darkred"
            : "red"
        }`}
        onClick={() => handleMouseclick("3c")}
      >
        <span> 3c </span>
        <span>Poor Performance low potential</span>
      </div>
      <div
        className={`grid-item ${
          selectedGrid === "3b Good performance low potential"
            ? "darkorange"
            : "orange"
        }`}
        onClick={() => handleMouseclick("3b")}
      >
        <span>3b</span>
        <span> Good performance low potential</span>
      </div>
      <div
        className={`grid-item ${
          selectedGrid === "3a Outstanding performance low potential"
            ? "darkyellow"
            : "yellow"
        }`}
        onClick={() =>
          handleMouseclick("3a")
        }
      >
        <span> 3a </span>
        <span>Outstanding performance low potential</span>
      </div>
    </div>
  );
};

export default Grid;
