import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.scss';

const UserProfileEdit = (props) => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [jobFields, setJobFields] = useState([
      { job: '', JobFields: '' }
    ]);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const res = await axios.get('http://127.0.0.1:8000/api/get-user-data', config);
        // setFirstName(res.data.user.first_name);
        // setPrefix(res.data.user.prefix);
        // setLastName(res.data.user.last_name);
        setCity(res.data.user.city);
        setProvince(res.data.user.province);
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
        event.preventDefault();
        const data = new FormData();
            data.append('file', profilePicture);
            data.append('province', province);
            data.append('city', city);

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const res = await axios.post('http://127.0.0.1:8000/api/update-user', data, config);
        console.log(res.data);

        props.history.push("/profile");
    }

    // console.log(profilePicture);
    // console.log("city: " + city);
    // console.log("province: " + province);
    // for (var i = 0; i < jobFields.length; i++) {
    //     console.log(jobFields[i]);
    // }
    // console.log("job: " + jobFields[0]);

    return(
        <section className ="userprofileedit">
            <form className="userprofileedit__form" onSubmit={handleSubmit} method="POST">

                <h2>Algemene informatie</h2>
                <label htmlFor="profilePicture">Afbeelding:</label>
                <input
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
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
                <p>Huidige video: <i>Profiel.mp4</i></p>

                <h2>Eerdere banen</h2>
                {jobFields.map((inputField, index) => (
                  <Fragment key={`${inputField}~${index}`}>
                      <label htmlFor="job">Baan/functie</label>
                      <input
                        type="text"
                        className="form-control"
                        id="job"
                        name="job"
                        value={inputField.job}
                        onChange={event => handleInputChange(index, event)}
                      />
                      <label htmlFor="period">Periode</label>
                      <input
                        type="text"
                        className="form-control"
                        id="period"
                        name="period"
                        value={inputField.JobFields}
                        onChange={event => handleInputChange(index, event)}
                      />
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
