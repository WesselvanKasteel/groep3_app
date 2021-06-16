import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserProfile.css';

const UserProfileEdit = (props) => {
    const [profilePicture, setProfilePicture] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [jobs, setJobs] = useState([{previous_jobs: ''}]);
    const [externalCV, setExternalCV] = useState('');
    //const [jobs, setJobs] = useState(['vakkenvuller', 'schoonmaker','afwasser', 'Student 2019-2020', 'Docent 2022-2028']);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const res = await axios.get('http://127.0.0.1:8000/api/user', config);
        setAddress(res.data.user.address);
        setCity(res.data.user.city);
        setProvince(res.data.user.province);
        setCountry(res.data.user.country);
        // setJobs(res.data.user.jobs);
        if (res.data.user.external_cv === null) {
            setExternalCV("");
        }
        else {
            setExternalCV(res.data.user.external_cv);
        }

        console.log(res.data);
    }

    const addressChangeHandler = (event) => {
        setAddress(event.target.value);
    }

    const cityChangeHandler = (event) => {
        setCity(event.target.value);
    }

    const provinceChangeHandler = (event) => {
        setProvince(event.target.value);
    }

    const countryChangeHandler = (event) => {
        setCountry(event.target.value);
    }

    const handleJobsAddFields = () => {
      const values = [...jobs];
      values.push({ previous_jobs: '' });
      setJobs(values);
    };

    const handleJobsRemoveFields = index => {
        const values = [...jobs];
        values.splice(index, 1);
        setJobs(values);
    };

    const handleJobsInputChange = (index, event) => {
        const values = [...jobs];
        values[index].previous_jobs = event.target.value;
        setJobs(values);
    };

    const profilePictureUpdateHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('picture', profilePicture);

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const res = await axios.post('http://127.0.0.1:8000/api/user/edit/picture', formData, config);
        console.log(res.data);
    };

    const profileUpdateHandler = async (event) => {
        event.preventDefault();

        // let cv;
        // if (!externalcv.includes("https://")) {
        //     cv = "https://" + externalcv;
        // }
        // else if (!externalcv.includes("http://")) {
        //     cv = "http://" + externalcv;
        // }

        let tempCV;
        if(!externalCV.includes('https://')) {
            tempCV = 'https://' + externalCV;
        }
        else {
            tempCV = externalCV;
        }
        // if(!externalCV.includes('https://')) {
        //     setExternalCV(`https://${externalCV}`);
        // } else {
        //     setExternalCV(`http://${externalCV}`);
        // };

        const data = {
            address: address,
            city: city,
            province: province,
            country: country,
            previous_jobs: jobs,
            external_cv: tempCV,
        };
        console.log(jobs);

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const res = await axios.put('http://127.0.0.1:8000/api/user/edit', data, config);
        console.log(res.data);
        props.history.push("/profile");
    };

    return(
        <section className ="userprofileedit">
            <form className="userprofileedit__form" onSubmit={profilePictureUpdateHandler} method="POST">
                <h2>Afbeelding</h2>
                <label htmlFor="profilePicture">Afbeelding:</label>
                <input
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                />
                <button>Upload</button>
            </form>
            <form className="userprofileedit__form" onSubmit={profileUpdateHandler} method="POST">
                <h2>Algemene informatie</h2>

                <label htmlFor="address">Adres:</label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={addressChangeHandler}
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
                <label htmlFor="country">Land:</label>
                <input
                    type="text"
                    name="country"
                    id="country"
                    value={country}
                    onChange={countryChangeHandler}
                />

                <h2>Kennismaking video</h2>
                <p>Huidige video: <i>Profiel.mp4</i></p>

                <h2>Eerdere banen</h2>
                {jobs.map((inputField, index) => (
                    <Fragment key={`${inputField}~${index}`}>
                        <label htmlFor="jobs">Baan/functie + periode:</label>
                        <input
                          type="text"
                          id="jobs"
                          name="jobs"
                          value={inputField.jobs}
                          onChange={event => handleJobsInputChange(index, event)}
                        />
                        <button
                          className="btn btn-link"
                          type="button"
                          onClick={() => handleJobsRemoveFields(index, jobs)}
                        >-</button>
                        <button
                          className="btn btn-link"
                          type="button"
                          onClick={() => handleJobsAddFields()}
                        >+</button>
                    </Fragment>
                  ))}

                <h2>Opleidingen</h2>

                <h2>Skills</h2>

                <h2>Extern CV</h2>
                <label htmlFor="externalCV">Link:</label>
                <input
                    type="text"
                    name="externalCV"
                    id="externalCV"
                    value={externalCV}
                    onChange={(event) => setExternalCV(event.target.value)}
                />
                <button type="submit">Opslaan</button>
                <Link className="userprofileedit__form__cancel"to="/profile">Annuleren</Link>
            </form>
        </section>
    );
};

export default UserProfileEdit;
