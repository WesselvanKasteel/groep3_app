import React, { useState, useEffect } from 'react';

// css
import './Vacancy.css';

// react-router
import { Link, useParams } from 'react-router-dom';

// axios
import axios from 'axios';

// icons
import Location from '../../assets/svg/location.svg';

// video
import Video from '../../assets/videos/VidVaSo_video_1.mp4';

const Vacancy = () => {

    const [data, setData] = useState(null)
;

    const BASE_URL = 'http://127.0.0.1:8000/api/vacancy';
    const IDENTIFIER = useParams().handle;

    useEffect(() => {
        fetchVacancyData();
    }, []);


    const fetchVacancyData = async () => {
        
        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { code: IDENTIFIER }
        };

        const res = await axios.get(BASE_URL + '/vacancy', config);
        setData(res.data.vacancy);
    }

    let skills;
    if (data !== null) {
        skills = data.skills.map((skill) => <li className="vacancy__skills__list__item" key={skill.skill}>{skill.skill}</li>
    )}
        

    return (
        <section className="vacancy">
            {data !== null &&
                <div className="vacancy__container">
                    <article className="vacancy__title">
                        <h2 className="vacancy__title--company">{data.users[0].company_name}</h2>
                        <h4 className="vacancy__title--job">{data.title}</h4>
                    </article>
                    <article className="vacancy__info">
                        <ul className="vacancy__info__list">
                            <li className="vacancy__info__list__item">
                                <img className="vacancy__info__list__item__img" src={Location} alt="location icon" />
                                <p className="vacancy__info__list__item__address">{data.users[0].address + ', ' +  data.users[0].country}</p>
                            </li>
                        </ul>
                        <p className="vacancy__info__description">{ data.description }</p>
                    </article>
                    <article className="vacancy__video">
                        <h3 className="vacancy__video__title">Video</h3>
                        <video className="vacancy__video__src" src={Video} controls></video>
                    </article>
                    <article className="vacancy__skills">
                        <h3 className="vacancy__skills__title">Vaardigheden</h3>
                        <ul className="vacancy__skills__list">
                            { skills }
                        </ul>
                    </article>
                    <article className="vacancy__apply">
                        <h3 className="vacancy__apply__title">Solliciteer</h3>
                        <p className="vacancy__apply__info">Start het solliciteer proces door op onderstaande knop te drukken.</p>
                        <Link to={'/maak-sollicitatievideo/' + IDENTIFIER} className="vacancy__apply__btn">Solliciteer nu</Link>
                    </article>
                </div>
            }
        </section>
    )
}

export default Vacancy;