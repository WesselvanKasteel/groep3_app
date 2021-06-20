import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserProfile.css';

const UserProfileEdit = (props) => {
    const [profilePicture, setProfilePicture] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [externalCV, setExternalCV] = useState('');
    const [enteredJob, setEnteredJob] = useState('');
    const [jobs, setJobs] = useState([]);
    const [enteredSkill, setEnteredSkill] = useState('');
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const res = await axios.get('http://127.0.0.1:8000/api/user', config);
        console.log(res.data);
        setAddress(res.data.user.address);
        setCity(res.data.user.city);
        setProvince(res.data.user.province);
        setCountry(res.data.user.country);
        setSkills(res.data.user.skills);
        setJobs(res.data.user.jobs);
        if (res.data.user.external_cv === null) {
            setExternalCV('');
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


    const jobsInputChangeHandler = (event) => {
        setEnteredJob(event.target.value);
    }

    const jobsRemoveHandler = (index) => {
        setJobs(jobs.filter((_, i) => i !== index));
    };

    const skillsInputChangeHandler = (event) => {
        setEnteredSkill(event.target.value);
    }

    const skillsRemoveHandler = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
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

        let tempCV;
        if(!externalCV.includes('https://')) {
            tempCV = 'https://' + externalCV;
        }
        else {
            tempCV = externalCV;
        }

        const profileData = {
            address: address,
            city: city,
            province: province,
            country: country,
            // previous_jobs: jobs,
            external_cv: tempCV,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const profileRes = await axios.put('http://127.0.0.1:8000/api/user/edit', profileData, config);
        console.log(profileRes.data);

        props.history.push('/profiel');
    };
    const storeJobsHandler = async () => {
        // const jobsToBeAdded = jobs.map(job => {
        //     return job.job;
        // });

        const jobsData = {
            job: enteredJob,
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const jobsRes = await axios.post('http://127.0.0.1:8000/api/jobs/store', jobsData, config);
        console.log(jobsRes.data);
    }

    const storeSkillsHandler = async () => {
        // const skillsToBeAdded = skills.map(skill => {
        //     return skill.skill;
        // });

        const skillsData = {
            skill: enteredSkill,
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const skillsRes = await axios.post('http://127.0.0.1:8000/api/skills/store', skillsData, config);
        console.log(skillsRes.data);
    }

    const jobsAddHandler = () => {
        if(enteredJob === '') {
            return;
        }

        setJobs(prevJobs => {
            return [
                ...prevJobs,
                {
                    job: enteredJob,
                }
            ];
        });
        storeJobsHandler();
        setEnteredJob('');
    };

    const skillsAddHandler = () => {
        if(enteredSkill === '') {
            return;
        }

        setSkills(prevSkills => {
            return [
                ...prevSkills,
                {
                    skill: enteredSkill,
                }
            ];
        });
        storeSkillsHandler();
        setEnteredSkill('');
    };


    // const jobsEmpty = jobs.length === 0 && (
    //     <p>Je hebt nog geen banen.</p>
    // );

    let jobsList;
    if (jobs.length === 0) {
        jobsList = <p><i>Je hebt nog geen banen toegevoegd</i></p>
    }
    else {
        jobsList = jobs.map(job => (
            <p key={job.id}>{job.job}</p>
        ))
    }

    let skillsList;
    if (skills.length === 0) {
        skillsList = <p><i>Je hebt nog geen skills toegevoegd</i></p>
    }
    else {
        skillsList = skills.map(skill => (
            <p className="userprofile__form__skill" key={skill.id}>{skill.skill}</p>
        ))
    }

    // const skillsEmpty = skills.length === 0 && (
    //     <p>Je hebt nog geen skills.</p>
    // );
    // const skillsList = skills.map(skill => (
    //     <p className="userprofile__form__skill" key={skill.id}>{skill.skill}</p>
    // ))

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
                <button className="userprofileedit__form__button">Upload</button>
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
                {jobsList}
                <label htmlFor="job">Banen:</label>
                <input
                    type="text"
                    id="job"
                    name="job"
                    value={enteredJob}
                    onChange={jobsInputChangeHandler}
                />
                <button
                    type="button"
                    className="userprofileedit__form__button userprofileedit__form__button--add"
                    onClick={jobsAddHandler}
                >+</button>

                <h2>Opleidingen</h2>

                <h2>Skills</h2>
                {skillsList}
                <label htmlFor="skill">Skill:</label>
                <input
                    type="text"
                    id="skill"
                    name="skill"
                    value={enteredSkill}
                    onChange={skillsInputChangeHandler}
                />
                <button
                    type="button"
                    className="userprofileedit__form__button userprofileedit__form__button--add"
                    onClick={skillsAddHandler}
                >+</button>

                <h2>Extern CV</h2>
                <label htmlFor="externalCV">Link:</label>
                <input
                    type="text"
                    name="externalCV"
                    id="externalCV"
                    value={externalCV}
                    onChange={(event) => setExternalCV(event.target.value)}
                />
                <button className="userprofileedit__form__button userprofileedit__form__button--save">Opslaan</button>
                <button className="userprofileedit__form__button userprofileedit__form__button--cancel">
                    <Link to="/profiel">Annuleren</Link>
                </button>
            </form>
        </section>
    );
};

export default UserProfileEdit;
