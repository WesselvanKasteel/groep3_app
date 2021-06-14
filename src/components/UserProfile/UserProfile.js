import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './UserProfile.scss';

const UserProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [prefix, setPrefix] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [jobs, setJobs] = useState(['vakkenvuller', 'schoonmaker','afwasser', 'Student 2019-2020', 'Docent 2022-2028']);
    const [skills, setSkills] = useState(['HTML', 'CSS','Javascript', 'Laravel', 'React']);
    const [educations, setEducations] = useState(['HAVO', 'HBO']);
    //const [externalcv, setExternalcv] = useState('');

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        // const res = await axios.get('http://127.0.0.1:8000/api/get-user-data', config);
        const res = await axios.get('http://127.0.0.1:8000/api/user', config);

        setFirstName(res.data.user.first_name);
        setPrefix(res.data.user.prefix);
        setLastName(res.data.user.last_name);
        setAge(res.data.age);
        setImage(window.location.hostname + ":8000/" + res.data.user.picture_path);
        setCity(res.data.user.city);
        setProvince(res.data.user.province);
        // console.log(res.data.user);
        // console.log(res.data.age);
    }

    const jobsList = jobs.map((job) =>
        <p key={job}>{ job }</p>
    );

    const educationsList = educations.map((education) =>
        <p key={education}>{ education }</p>
    );

    const skillsList = skills.map((skill) =>
        <p key={skill}>{ skill }</p>
    );

    return(
        <div className="userprofile">
            <section className="userprofile-content">
                <section className="userprofile-content__info">
                    {image !== "" &&
                    <img src={ image } alt="Profile" />
                    }
                    <div className="userprofile-content__info__textdiv">
                        <p className="userprofile-content__info__textdiv1">{ firstName + " "} {prefix !== "" && prefix}{ " " + lastName }</p>
                        <p className="userprofile-content__info__textdiv2">{ age + " jaar" }<br/>
                        { city + ", " + province }</p>
                    </div>
                </section>
                <section className="userprofile-content__edit userprofile-content__card">
                    <Link className="userprofile-content__edit__link" to="/profile-edit"><h2>Profiel bewerken</h2></Link>
                </section>
                <section className="userprofile-content__grid">
                    <article className="userprofile-content__grid__video userprofile-content__card">
                        <h2>Kennismaking video </h2>
                        <video width="100%" height="100%" loop controls>
                            <source src="vidvaso_video_1.mp4" type="video/mp4" />
                            <source src="vidvaso_video_1.webm" type="video/ogg" />
                            Dit device ondersteunt geen video.
                        </video>
                    </article>

                    <article className="userprofile-content__grid__jobs userprofile-content__card">
                        <h2>Eerdere banen</h2>
                        { jobsList }
                    </article>

                    <article className="userprofile-content__grid__education userprofile-content__card">
                        <h2>Opleidingen</h2>
                        { educationsList }
                    </article>

                    <article className="userprofile-content__grid__skills userprofile-content__card">
                        <h2>Skills</h2>
                        { skillsList }
                    </article>

                    <article className="userprofile-content__grid__external userprofile-content__card">
                        <h2>Extern CV</h2>
                        <a href="#">Linkedin</a>
                    </article>
                </section>
            </section>
        </div>
    );
};

export default UserProfile;
