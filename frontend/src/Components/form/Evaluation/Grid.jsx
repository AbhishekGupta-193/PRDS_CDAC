import React, { useState } from "react";
import "./Grid.css"; // Import the CSS file for styling
import { bgcolor } from "@mui/system";
import { logDOM } from "@testing-library/react";

const Grid = ({CurEmp,setCurEmp}) => {
  const [selectedGrid, setSelectedGrid] = useState(null);

   const updateGridStatus = (grid)=>{
    setCurEmp({
      ...CurEmp,
      quarter: [
        ...CurEmp.quarter.slice(
          0,
          CurEmp.quarter.length - 1
        ),
        {
          ...CurEmp.quarter[CurEmp.quarter.length - 1],
          employeeFinalRemark:grid
        },
      ],
    })
  
   }
  const handleMouseclick = (grid) => {
    setSelectedGrid(grid);
    updateGridStatus(grid);
    console.log({grid});
  };

  return (
    <div className="grid-container">
      <div className="left">
        <div
          className={`grid-itemEX ${selectedGrid === "High" ? "selected" : ""}`}
        >
          High
        </div>
        <div
          className={`grid-itemEX ${selectedGrid === "Moderate" ? "selected" : ""}`}
          onClick={() => handleMouseclick("Moderate")}
        >
          Moderate
        </div>
        <div
          className={`grid-itemEX ${selectedGrid === "Limited" ? "selected" : ""}`}
          onClick={() => handleMouseclick("Limited")}
        >
          Limited
        </div>
      </div>
      <div className="left_text">
        <span>L</span>
        <span>E</span>
        <span>A</span>
        <span>D</span>
        <span>E</span>
        <span>R</span>
        <span>S</span>
        <span>H</span>
        <span>I</span>
        <span>P</span>
        <br />
        <span>P</span>
        <span>O</span>
        <span>T</span>
        <span>E</span>
        <span>N</span>
        <span>T</span>
        <span>I</span>
        <span>A</span>
        <span>L</span>
      </div>
      <div className="right">
        <div className="top">
          <div
            className={`grid-itemEX ${selectedGrid === "Need development" ? "selected" : ""
              }`}
          >
            Need development
          </div>
          <div
            className={`grid-itemEX ${selectedGrid === "Meet expectation" ? "selected" : ""
              }`}
          >
            Meet expectation
          </div>
          <div
            className={`grid-itemEX ${selectedGrid === "Exceed expectation" ? "selected" : ""
              }`}
          >
            Exceed expectation
          </div>
        </div>
        <div className="main_grid">
          <div
            className={`grid-item ${selectedGrid === "1c"
              ? "darkyellow"
              : "yellow"
              }`}
            onClick={() => handleMouseclick("1c")}
          >
            <span> <strong>Progressing Performer</strong> </span><br />
            <span>Poor Performance High potential</span>
          </div>
          <div
            className={`grid-item ${selectedGrid === "1b"
              ? "darkgreen"
              : "green"
              }`}
            onClick={() => handleMouseclick("1b")}
          >
            <span> <strong>Emerging Talent</strong> </span><br />
            <span>Good performance High potential</span>
          </div>
          <div
            className={`grid-item ${selectedGrid === "1a"
              ? "darkblue"
              : "blue"
              }`}
            onClick={() =>
              handleMouseclick("1a")
            }
          >
            <span> <strong>High Achiever</strong> </span><br />
            <span>Outstanding performance High potential</span>
          </div>
          <div
            className={`grid-item ${selectedGrid === "2c"
              ? "darkorange"
              : "orange"
              }`}
            onClick={() =>
              handleMouseclick("2c")
            }
          >
            <span> <strong>Growth-oriented Individual</strong> </span><br />
            <span>Poor Performance Moderate potential</span>
          </div>
          <div
            className={`grid-item ${selectedGrid === "2b"
              ? "darkyellow"
              : "yellow"
              }`}
            onClick={() =>
              handleMouseclick("2b")
            }
          >
            <span> <strong>Competence Builder</strong> </span><br />
            <span> Good performance Moderate potential</span>
          </div>
          <div
            className={`grid-item ${selectedGrid === "2a"
              ? "darkgreen"
              : "green"
              }`}
            onClick={() =>
              handleMouseclick("2a")
            }
          >
            <span> <strong>Capable Trainee</strong> </span><br />
            <span> Outstanding performance Moderate potential</span>
          </div>
          <div
            className={`grid-item ${selectedGrid === "3c"
              ? "darkred"
              : "red"
              }`}
            onClick={() => handleMouseclick("3c")}
          >
            <span> <strong>Potential for Skill Advancement</strong> </span><br />
            <span>Poor Performance low potential</span>
          </div>
          <div
            className={`grid-item ${selectedGrid === "3b"
              ? "darkorange"
              : "orange"
              }`}
            onClick={() => handleMouseclick("3b")}
          >
            <span> <strong>Learning Enthusiast</strong> </span><br />
            <span> Good performance low potential</span>
          </div>
          <div
            className={`grid-item ${selectedGrid === "3a"
              ? "darkyellow"
              : "yellow"
              }`}
            onClick={() =>
              handleMouseclick("3a")
            }
          >
            <span> <strong>Seasoned Expert</strong> </span><br />
            <span>Outstanding performance low potential</span>
          </div>
        </div>
        <div className="right_bottom_text">
          Performance
        </div>
        <div className="right_bottom">
          <div
            className={`grid-itemEX ${selectedGrid === "Poor" ? "selected" : ""}`}
          >
            poor
          </div>
          <div
            className={`grid-itemEX ${selectedGrid === "Good" ? "selected" : ""}`}
          >
            Good
          </div>
          <div
            className={`grid-itemEX ${selectedGrid === "Outstanding" ? "selected" : ""}`}
          >
            Outstanding
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;
