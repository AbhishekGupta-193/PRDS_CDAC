import React, { useEffect, useState } from "react";
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import Arrows from "./Arrows";
import "./Slider.css";
function Slider({ carouselData }) {
    const len = carouselData.length - 1;
    // console.log(carouselData," aaaaa");
    // const [arr,setArr] = useState(['../imgs/pf_img1.jpg'])
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, [activeIndex]);
    
    return (
        <div className="slider-container">
            <SliderContent activeIndex={activeIndex} sliderImage={carouselData} />
            <Arrows
                prevSlide={() =>
                    setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
                }
                nextSlide={() =>
                    setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
                }
            />
            <Dots
                activeIndex={activeIndex}
                sliderImage={carouselData}
                onclick={(activeIndex) => setActiveIndex(activeIndex)}
            />
        </div>
    );
}

export default Slider;