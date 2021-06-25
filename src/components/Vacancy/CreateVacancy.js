import React, { useState, useEffect } from 'react';

// css
import './CreateVacancy.css';

// axios
import axios from 'axios';

const CreateVacancy = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [video, setvideo] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const updateTitle = (value) => { setTitle(value); }
    const updateDescription= (value) => {setDescription(value); }
    const updateDeadline = (value) => { setDeadline(value); }

    return (
        <section className="create_vacancy">
            
            <h1 className="create_vacancy__title">Vacature aanmaken</h1>
            
            <form className="create_vacancy__input" onSubmit={handleSubmit}>
                <label className="create_vacancy__input__label" 
                    htmlFor="name">Functie naam
                </label>
                <input className="create_vacancy__input__name" 
                    type="text" 
                    id="name" 
                    name="name" 
                    onChange={(event) => updateTitle(event.target.value)}
                    required
                />

                <label className="create_vacancy__input__label" 
                    htmlFor="description">Beschrijving
                </label>
                <textarea className="create_vacancy__input__description" 
                    id="description" 
                    name="description" 
                    cols="30" 
                    rows="5" 
                    onChange={(event) => updateDescription(event.target.value)}
                    required
                ></textarea>

                <label className="create_vacancy__input__label" 
                    htmlFor="date">Deadline
                </label>
                <input className="create_vacancy__input__date" 
                    type="date" 
                    id="date" 
                    name="date" 
                    onChange={(event) => updateDeadline(event.target.value)}
                    required
                />

                <div className="create_vacancy__input__video">
                    {/* <video className="webcam__preview" ref={recordWebcam.webcamRef} autoPlay muted /> */}
                </div>

                <button className="create_vacancy__input__button">Vacature aanmaken</button>
            </form>

        </section>
    )
}

export default CreateVacancy;
