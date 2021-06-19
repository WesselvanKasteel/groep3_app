import React, { useEffect } from 'react';

// scss
import './SearchProfileCard.css';

// images (hardcode)
import NikeLogo from '../../../assets/images/nike.png';

const SearchProfileCard = ({ data }) => {

    useEffect(() => {
        // console.log(data);
    }, [data])

    const profileTags = data.skills.map((skill, index) =>
        <li className="profile-card__list__item" key={index}>{skill.skill}</li>
    );


    return (
        <li className="profile-card">
            <div className="profile-card__logo">
                <img className="profile-card__logo__img" src={NikeLogo} alt="logo" />
            </div>

            <h3 className="profile-card__title">{data.title}</h3>
            <h4 className="profile-card__subtitle">{data.title}</h4>

            <ul className="profile-card__list">
                {profileTags}
            </ul>

            <button className="profile-card__btn">Nu bekijken</button>
        </li>
    )
}

export default SearchProfileCard;