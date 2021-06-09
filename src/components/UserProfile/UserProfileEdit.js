import React, { useState, Fragment } from 'react';
import axios from 'axios';
import './UserProfile.scss';

const UserProfileEdit = () => {
    const [profilePicture, setProfilePicture] = useState();
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    // const [job, setJob] = useState('');
    const [jobFields, setJobFields] = useState([
      { job: '', JobFields: '' }
    ]);

    const profilePictureData = {
        profilePicture: profilePicture,
    }

    const ageChangeHandler = (event) => {
        setAge(event.target.value);
    }

    const cityChangeHandler = (event) => {
        setCity(event.target.value);
    }

    const provinceChangeHandler = (event) => {
        setProvince(event.target.value);
    }

    const handleAddFields = () => {
      const values = [...jobFields];
      values.push({ job: '', JobFields: '' });
      setJobFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...jobFields];
        values.splice(index, 1);
        setJobFields(values);
    };

    const handleInputChange = (index, event) => {
        const values = [...jobFields];
        if (event.target.name === "job") {
            values[index].job = event.target.value;
        }
        else {
            values[index].JobFields = event.target.value;
        }
        setJobFields(values);
    };

    const handleSubmit = async (event) => {
        console.log("profilePicture: " + profilePicture);
        console.log("age: " + age);
        console.log("city: " + city);
        console.log("province: " + province);
        event.preventDefault();
        const profileData = {
            profilePicture: profilePicture,
            age: age,
            city: city,
            province: province
        }

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const res = await axios.put('http://127.0.0.1:8000/api/update-user', profileData, config);
        console.log(res.data);
    }


    console.log(profilePicture);
    console.log("age: " + age);
    console.log("city: " + city);
    console.log("province: " + province);
    // for (var i = 0; i < jobFields.length; i++) {
    //     console.log(jobFields[i]);
    // }
    // console.log("job: " + jobFields[0]);

    return(
        <section className ="userprofileedit">
            <form className="userprofileedit__form" method="PUT" onSubmit={handleSubmit}>

                <h2>Algemene informatie</h2>
                <label htmlFor="profilePicture">Afbeelding:</label>
                <input
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={(e) => setProfilePicture(e.target.files)}
                />
                <button>Upload image</button>
                <label htmlFor="age">Leeftijd:</label>
                <input
                    type="number"
                    name="age"
                    id="age"
                    value={age}
                    onChange={ageChangeHandler}
                />
                <label htmlFor="city">Plaats:</label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={cityChangeHandler}
                />
                <label htmlFor="province">Provincie:</label>
                <input
                    type="text"
                    name="province"
                    id="province"
                    value={province}
                    onChange={provinceChangeHandler}
                />

                <h2>Kennismaking video</h2>
                <p>Huidige video: <i>Pjeenter.mp4</i></p>

                <h2>Eerdere banen</h2>
                {jobFields.map((inputField, index) => (
                  <Fragment key={`${inputField}~${index}`}>
                    <div className="input1">
                      <label htmlFor="job">Baan/functie</label>
                      <input
                        type="text"
                        className="form-control"
                        id="job"
                        name="job"
                        value={inputField.job}
                        onChange={event => handleInputChange(index, event)}
                      />
                    </div>
                    <div className="input2">
                      <label htmlFor="period">Periode</label>
                      <input
                        type="text"
                        className="form-control"
                        id="period"
                        name="period"
                        value={inputField.JobFields}
                        onChange={event => handleInputChange(index, event)}
                      />
                    </div>
                    <div className="btn">
                      <button
                        className="btn btn-link"
                        type="button"
                        onClick={() => handleRemoveFields(index)}
                      >-</button>
                      <button
                        className="btn btn-link"
                        type="button"
                        onClick={() => handleAddFields()}
                      >+</button>
                    </div>
                  </Fragment>
                ))}

                <h2>Opleidingen</h2>
                <h2>Skills</h2>
                <h2>Extern CV</h2>

                <button type="submit">Submit</button>
            </form>
        </section>
    );
};

export default UserProfileEdit;
