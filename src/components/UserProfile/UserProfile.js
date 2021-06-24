import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './UserProfile.css';

const UserProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [prefix, setPrefix] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [jobs, setJobs] = useState([]);
    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState([]);
    const [externalCV, setExternalCV] = useState('');
    const [video, setVideo] = useState(null);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const res = await axios.get('http://127.0.0.1:8000/api/user', config);
        console.log(res.data);

        setFirstName(res.data.user.first_name);
        setPrefix(res.data.user.prefix);
        setLastName(res.data.user.last_name);
        setAge(res.data.age);
        setImage(res.data.user.picture);
        setCity(res.data.user.city);
        setProvince(res.data.user.province);
        setJobs(res.data.user.jobs);
        setEducation(res.data.user.education);
        setSkills(res.data.user.skills);
        setExternalCV(res.data.user.external_cv);
        setVideo(res.data.video.path);
    }

    const jobsList = jobs.map(job =>
        <p key={job.id}>{job.job}</p>
    );

    const educationList = education.map(education =>
        <p key={education.id}>{education.education}</p>
    );

    const skillsList = skills.map(skill =>
        <p className="userprofile-content__grid__skills__skill" key={skill.id}>{skill.skill}</p>
    );

    return (
        <div className="userprofile">
            <section className="userprofile-content">
                <section className="userprofile-content__info">
                    {image !== "" &&
                        <img src={`data:image/jpg;base64,${image}`} className="userprofile-content__info__img" alt="Profiel foto" />
                    }
                    <div className="userprofile-content__info__textdiv">
                        <p className="userprofile-content__info__textdiv1">{firstName + " "} {prefix !== "" && prefix}{" " + lastName}</p>
                        <p className="userprofile-content__info__textdiv2">{age + " jaar"}<br />
                            {city + ", " + province}</p>
                    </div>
                </section>
                    <Link className="userprofile-content__edit" to="/profiel-bewerken">Profiel bewerken</Link>
                <section className="userprofile-content__grid">
                    <article className="userprofile-content__grid__video userprofile-content__card">
                        <h2>Kennismaking video </h2>

                        {video &&
                            <video width="100%" height="100%" controls>
                                <source src={video} type="video/mp4" />
                                Dit device ondersteunt geen video.
                            </video>
                        }

                    </article>

                    <article className="userprofile-content__grid__jobs userprofile-content__card">
                        <h2>Eerdere banen</h2>
                        {jobsList}
                    </article>

                    <article className="userprofile-content__grid__education userprofile-content__card">
                        <h2>Opleidingen</h2>
                        {educationList}
                    </article>

                    <article className="userprofile-content__grid__skills userprofile-content__card">
                        <h2>Skills</h2>
                        {skillsList}
                    </article>

                    {externalCV &&
                        <article className="userprofile-content__grid__external userprofile-content__card">
                            <h2>Extern CV</h2>
                            <a href={externalCV} target="_blank" rel="noreferrer">Link</a>
                        </article>
                    }
                </section>
            </section>
        </div>
    );
};

export default UserProfile;
