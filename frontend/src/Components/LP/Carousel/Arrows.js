import React from "react";
import {AiOutlineArrowRight} from 'react-icons/ai'
import {AiOutlineArrowLeft} from 'react-icons/ai'

function Arrows({ prevSlide, nextSlide }) {
    return (
        <div className="arrows" >
            <button className="prev" onClick={prevSlide}><i className="fas fa-chevron-left">
            <AiOutlineArrowLeft/>
                
                </i></button>
            <button className="next" onClick={nextSlide}><i className="fas fa-chevron-right">
                
            <AiOutlineArrowRight/>
                </i></button>
        </div>
    );
}

export default Arrows;