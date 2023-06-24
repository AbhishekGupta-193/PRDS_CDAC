import React from "react";
import "./LandingHRMIS.css";
import Landing_nav from "./Landing_nav";
// import Img1 from "./imgs/img1.jpg"


export const LandingHRMIS = () => {
  return (
    <div className="Landing_wrapper">
      <Landing_nav />
      <div className="cover">
        <div className="cover__content">
          <h1 className="cover__title">
            Human Resource Management and Information System
          </h1>
          <h2 className="cover__subtitle">CDAC Silchar</h2>
          <button className="cover__button">Get Started</button>
        </div>
      </div>
     <section className="About">
        <div className="about_us">
          
        </div>
     </section>
    </div>
  );
};
