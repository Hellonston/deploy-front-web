import React from 'react';
import './Slider.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

// funcion sacada de https://www.youtube.com/watch?v=ywqfSXSbs60

const ReactCardSlider =(props)=>{

    const slideLeft =()=>{
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const slideRight =()=>{
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    return(
        <div id='main-slider-container'>
            <MdChevronRight size={40} className='slider-icon left' onClick={slideLeft}/>
            <div id='slider'>
                {
                props.slides.map((slide,index)=>{
                    return(
                        <div className='slider-card' key={index}>  
                            <div className='slider-card-image' style={{backgroundImage: `url(${slide.image})`}}></div>
                            <p className='slider-card-title'>{slide.title}</p>
                            <p className='slider-card-description'>{slide.description}</p>
                        </div>
                    )
                })
            }
        </div>

        <MdChevronLeft size={40} className='slider-icon right' onClick={slideRight}/>
    </div>

    )
}

export default ReactCardSlider