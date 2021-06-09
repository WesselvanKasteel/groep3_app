import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.scss';
import {Link} from 'react-router-dom';

const UserProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [prefix, setPrefix] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const res = await axios.get('http://127.0.0.1:8000/api/get-user-data', config);
        
        if(res.data.user.prefix) {
            setPrefix(res.data.user.prefix);
        }

        setFirstName(res.data.user.first_name);
        setLastName(res.data.user.last_name);
        setAge(res.data.age);
        setImage(window.location.hostname + ":8000/" + res.data.user.picture_path);
        setCity(res.data.user.city);
        setProvince(res.data.user.province);
        // console.log(window.location.hostname + ":8000/" + res.data.user[0].picture_path);
        //console.log(res.data);
    }

    return(
        <article className="userprofile">
            <section className="userprofile-content">
                <section className="userprofile-content__info">
                    {image !== "" &&
                    <img src={ image } alt="Profile" />
                    }
                    <div className="userprofile-content__info__textdiv">
                        <p className="userprofile-content__info__textdiv1">{ firstName + " " + prefix + " " + lastName}</p>
                        <p className="userprofile-content__info__textdiv2">{ age + " jaar"}<br/>
                        { city + ", " + province }</p>
                    </div>
                </section>

                <section className="userprofile-content__edit userprofile-content__card">
                    <Link className="userprofile-content__edit__link" to="/profile-edit"><h2>Profiel bewerken</h2></Link>
                </section>

                <section className="userprofile-content__video userprofile-content__card">
                    <h2>Kennismaking video </h2>
                        <video width="100%" height="100%" loop controls>
                        <source src="vidvaso_video_1.mp4" type="video/mp4" />
                        <source src="vidvaso_video_1.webm" type="video/ogg" />
                        Dit device ondersteunt geen video.
                        </video>
                </section>

                <section className="userprofile-content__jobs userprofile-content__card">
                    <h2>Eerdere banen</h2>
                        <p>Vakken vuller AH 2017-2018</p>
                        <p>Vakken vuller AH 2017-2018</p>
                </section>

                <section className="userprofile-content__education userprofile-content__card">
                    <h2>Opleidingen</h2>
                    <p>Hogeschool Leiden 2016-2020</p>
                    <p>Hogeschool Leiden 2016-2020</p>
                </section>

                <section className="userprofile-content__skills userprofile-content__card">
                    <h2>Skills</h2>
                    <p>HTML</p>
                    <p>HTML</p>
                </section>

                <section className="userprofile-content__external userprofile-content__card">
                    <h2>Extern CV</h2>
                    <a href="#">Linkedin</a>
                </section>

            </section>
        </article>
    );
};

export default UserProfile;
