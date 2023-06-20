import React, { useEffect, useState } from "react";
import "./Evaluation_form.css"
import kk from "../../../Assets/Employee.png"
import { FaStar } from "react-icons/fa";
import { useGlobalContext } from "../../../StateContext";
import { useNavigate } from "react-router-dom";

export const Evaluation_form = () => {
  const [scores, setScores] = useState([0, 0, 0, 0, 0, 0]);
  const {curuser,setcuruser} = useGlobalContext();
  
  const totalScore = scores.reduce((total, score) => total + score, 0);
  const overallScore = scores.reduce((total, score) => total + score, 0);
  const textarray = [
    "Technical Knowledge & skills, demonstrates originality & Quality of work done",
    "Possess Conceptual Ability. Analyzes problem effectively & finds creative solution to problems",
    "Shows interest in work, learns quickly & Takes initiative",
    "Punctuality, Behavior & Professional Attitude",
    "Open to Criticism & Able to work well with others",
    "Communication Skills - oral and written",
  ];

  
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  const getRemark = () => {
    switch (rating) {
      case 1:
        return "Need Improvement";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Select a rating";
    }
  };
  const Star = ({ value, filled, onClick }) => (
    <span
      className={`rating__star ${filled ? "rating__star--filled" : ""}`}
      onClick={() => onClick(value)}
    >
      <FaStar />
    </span>
  );
  const EvaluationFormHandler = ()=>[
    setcuruser({...curuser,})
  ]
  const handleScoreChange = (index, value) => {
    const updatedScores = [...scores];
    const newScore = updatedScores[index] + value;
    if (newScore >= 0 && newScore <= 10) {
      updatedScores[index] = newScore;
      setScores(updatedScores);
    }
    const disk = document.querySelector("#circular-disk");
    const oversocre = updatedScores.reduce((total, score) => total + score, 0);
    disk.style.background = `conic-gradient(
     #F47169 ${(updatedScores[0] / oversocre) * 360}deg,
     #DFD391 ${(updatedScores[0] / oversocre) * 360}deg,
     #DFD391 ${
       (updatedScores[0] / oversocre) * 360 +
       (updatedScores[1] / oversocre) * 360
     }deg,
     #9DD49A ${
       (updatedScores[0] / oversocre) * 360 +
       (updatedScores[1] / oversocre) * 360
     }deg,
     #9DD49A  ${
       (updatedScores[2] / oversocre) * 360 +
       (updatedScores[0] / oversocre) * 360 +
       (updatedScores[1] / oversocre) * 360
     }deg,
     #91B1E1 ${
       (updatedScores[2] / oversocre) * 360 +
       (updatedScores[0] / oversocre) * 360 +
       (updatedScores[1] / oversocre) * 360
     }deg,
     #91B1E1 ${
       (updatedScores[3] / oversocre) * 360 +
       (updatedScores[2] / oversocre) * 360 +
       (updatedScores[0] / oversocre) * 360 +
       (updatedScores[1] / oversocre) * 360
     }deg,
     #B67DD1  ${
       (updatedScores[3] / oversocre) * 360 +
       (updatedScores[2] / oversocre) * 360 +
       (updatedScores[0] / oversocre) * 360 +
       (updatedScores[1] / oversocre) * 360
     }deg,
     #B67DD1  ${
       (updatedScores[4] / oversocre) * 360 +
       (updatedScores[3] / oversocre) * 360 +
       (updatedScores[2] / oversocre) * 360 +
       (updatedScores[0] / oversocre) * 360 +
       (updatedScores[1] / oversocre) * 360
     }deg,
     #CD749A  ${
       (updatedScores[4] / oversocre) * 360 +
       (updatedScores[3] / oversocre) * 360 +
       (updatedScores[2] / oversocre) * 360 +
       (updatedScores[0] / oversocre) * 360 +
       (updatedScores[1] / oversocre) * 360
     }deg,
     #CD749A 360deg`;

    console.log(oversocre);
  };

  const scoreColors = [
    "#F47169",
    "#DFD391",
    "#9DD49A",
    "#91B1E1",
    "#B67DD1",
    "#CD749A",
  ];

  return (
    <div className="Evaluation_form_page">
      <div className="Evaluation_heading">
        <span>Evaluation Form For Employees on Consolidated Pay</span>
      </div>
      <div className="Evaluation_main">
        <div className="Evaluation_form_wrapper">
          <img src={kk} alt="" />
          <div className="Employee_details">
            <div className="Name_of_employee">
              <span>Name of the employee</span>
              <div className="input">
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Last name" />
              </div>
            </div>
            <div className="Name_of_group_head">
              <span>Name of the group head</span>
              <div className="input">
                <input type="text" />
              </div>
            </div>
            <div className="Designation_date">
              <div className="Designation">
                <span>Designation</span>
                <div className="input">
                  <input type="text" placeholder="First name" />
                </div>
              </div>
              <div className="Date">
                <span>Date</span>
                <div className="input">
                  <input type="text" placeholder="dd/mm/yyyy" />
                </div>
              </div>
            </div>
            <div className="Period_of_review">
              <span>Period of review</span>
              <div className="input">
                <input type="text" placeholder="From" />
                <input type="text" placeholder="To" />
              </div>
            </div>
          </div>
        </div>

        <div className="Evaluation-and-OverAllPerformance">
          <div className="Evaluation_score">
            <div className="progress-bars">
              {scores.map((score, index) => (
                <div className="progress-bar" key={index}>
                  <div className="text">{textarray[index]}</div>
                  <div className="prog-bar">
                    <button onClick={() => handleScoreChange(index, -1)}>
                      -
                    </button>
                    <div className="bar">
                      <div
                        className="fill"
                        style={{
                          width: `${Math.floor((score / 10) * 100)}%`,
                          backgroundColor: scoreColors[index],
                        }}
                      />
                    </div>
                    <button onClick={() => handleScoreChange(index, 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div id="circular-disk" className="circular-disk">
              <div
                className="color-overlay"
                style={{
                  backgroundImage: `conic-gradient(white 0%, white 100%)`,
                }}
              />
              <div className="inner-circle">
                <div className="score">{overallScore}</div>
                <div className="text">out of 60</div>
              </div>
              <div className="outer-circle" />
            </div>
          </div>
          <div className="OverAllPerformance">
            <div className="Other-Eval-Param">
              <div className="concentric-circles">
                <div className="center">0/25</div>
                <div className="circle-outer">
                  <div className="circle-inner"></div>
                </div>
              </div>
              <div className="decription">
                <span>Part 2</span>
                <span>Self Appraisal</span>
              </div>
            </div>
            <div className="Other-Eval-Param">
              <div className="concentric-circles">
                <div className="center">0/15</div>
                <div className="circle-outer">
                  <div className="circle-inner"></div>
                </div>
              </div>
              <div className="decription">
                <span>Part 3</span>
                <span>Achievement beyond normal scope of work</span>
              </div>
            </div>
            
            <div className="OverAllPerformance">
              <span>Overall performance of Employee</span>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Type here .."
                value={curuser.additionalComments}
                onChange={(e)=>{
                  setcuruser({...curuser,additionalComments : e.target.value})
                }}
              ></textarea>
            </div>
            <div className="rating">
              <span className="rating__label">
                Employee performance rating:
              </span>
              <div className="rating__stars">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    value={value}
                    filled={value <= rating}
                    onClick={handleRating}
                  />
                ))}
              </div>
              <p className="rating__remark">{getRemark()}</p>
            </div>
            <button onClick={EvaluationFormHandler}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};