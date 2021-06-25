import React, { useEffect } from 'react';

// scss
import './SearchProfileCard.css';

// images (hardcode)
import NikeLogo from '../../../assets/images/nike.png';

const SearchProfileCard = ({ data }) => {

    const profileTags = data.skills.map((skill, index) =>
        <li className="profile-card__list__item" key={index}>{skill.skill}</li>
    );


    return (
        <li className="profile-card">
            <div className="profile-card__logo">
                <img className="profile-card__logo__img" src={data.picture} alt="profiel-foto" />
            </div>

            <h3 className="profile-card__title">{data.first_name} {data.last_name}, {data.prefix}</h3>
            <h4 className="profile-card__subtitle">{data.city}</h4>

            <ul className="profile-card__list">
                {profileTags}
            </ul>

            <button className="profile-card__btn">Nu bekijken</button>
        </li>
    )
}

export default SearchProfileCard;