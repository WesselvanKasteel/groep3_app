import React, { useEffect } from 'react';

// scss
import './SearchVacancyCard.css';

// images (hardcode)
import NikeLogo from '../../../assets/images/nike.png';

// react-router
import { Link } from 'react-router-dom';

const SearchVacancyCard = ({ data }) => {

    useEffect(() => {
  
    }, [])

    const vacancyTags = data.skills.map((skill, index) =>
        <li className="vacancy-card__list__item" key={index}>{skill.skill}</li>
    );


    return (
        <li className="vacancy-card">
            <div className="vacancy-card__logo">
                <img className="vacancy-card__logo__img" src={`data:image/jpg;base64,${data.users[0].picture}`} alt="logo" />
            </div>

            <h3 className="vacancy-card__title">{data.users[0].company_name}</h3>
            <h4 className="vacancy-card__subtitle">{data.title}</h4>

            <ul className="vacancy-card__list">
                {vacancyTags}
            </ul>

            <Link className="vacancy-card__btn" to={'/vacature/' + data.code}>Nu bekijken</Link>
        </li>
    )
}

export default SearchVacancyCard;