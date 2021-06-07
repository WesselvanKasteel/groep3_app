import React, { useState } from 'react';
import axios from 'axios';
import './UserProfile.scss';
import {Link} from 'react-router-dom'

class UserProfile extends React.Component {

    render(){
        return(
            <article className="userprofile">
                <section className="userprofile-content">
                    <section className="userprofile-content__info">
                        <img src="robert.png" alt="Profile" />
                        <div className="userprofile-content__info__textdiv">
                            <p className="userprofile-content__info__textdiv1">Robert van Riemsdijk</p>
                            <p className="userprofile-content__info__textdiv2">23 jaar<br/>
                            Katwijk, Zuid-Holland</p>
                        </div>
                    </section>

                    <section className="userprofile-content__edit userprofile-content__card">
                        <Link className="userprofile-content__edit__link" to="/profile-edit"><h2>Profiel bewerken</h2></Link>
                    </section>

                    <section className="userprofile-content__video userprofile-content__card">
                        <h2>Kennismaking video </h2>
                            <video width="100%" height="100%" loop controls>
                            <source src="pog.mp4" type="video/mp4" />
                            <source src="pog.webm" type="video/ogg" />
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
    }
};

export default UserProfile;
