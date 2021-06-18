import React, { useState } from 'react';

// scss
import './RadiusSlider.css';

const RadiusSlider = ({ distance, updateRadiusValue }) => {

    let value;
    if (distance < 1) {
        value = <p className="slider-radius__slide__value value-all">∞</p>
    } else {
        value = <p className="slider-radius__slide__value value-distance">{distance + ' km'}</p>
    }

    return (
        <div className="slider-radius">
             <h2 className="slider-radius__title">Zoek radius</h2>   

             <div className="slider-radius__slider">
                <input 
                    className="slider-radius__slide__input" 
                    type="range" 
                    min="0"
                    max="100" 
                    value={distance} 
                    onChange={(event) => updateRadiusValue(event.target.value)}
                />
                { value } 
            </div>
        </div>
    )
}

export default RadiusSlider;