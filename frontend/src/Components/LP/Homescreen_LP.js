import React from "react";
import styles from "./HomeScreen.module.css";
import Carousel from "./Carousel/Slider";
// import { Link } from "react-router-dom";
import Bottom from "./MoreInfo/index"
import Navbar from "./Navbar/index";
import CarouselData from './Carousel/carousel';

const Homescreen_LP = () => {
  return (
    <div>
      <Navbar />
      <div className={styles["carousel"]}>
        <Carousel carouselData={CarouselData} />
      </div>
      <span className={styles["quote"]}>
        "The primary objective of performance management is the
        establishment of a culture in which individuals and groups
        take responsibility for their own development and for the
        development of others in an attempt to achieve maximum
        levels of performance "
      </span>
      <div className={styles["hr"]}></div>
      <Bottom />
    </div>
  );
};

export default Homescreen_LP;
