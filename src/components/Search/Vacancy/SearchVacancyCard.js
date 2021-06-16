import React, { useEffect } from 'react';

// scss
import './SearchVacancyCard.scss';

// images (hardcode)
import NikeLogo from '../../../assets/images/nike.png';

const SearchVacancyCard = ({ data }) => {

    useEffect(() => {
        console.log(data);
    }, [data])

    const vacancyTags = data.tags.map((tag, index) =>
        <li className="vacancy-card__list__item" key={index}>{tag}</li>
    );


    return (
        <li className="vacancy-card">
            <div className="vacancy-card__logo">
                <img className="vacancy-card__logo__img" src={NikeLogo} alt="logo" />
            </div>

            <h3 className="vacancy-card__title">{data.name}</h3>
            <h4 className="vacancy-card__subtitle">{data.duty}</h4>

            <ul className="vacancy-card__list">
                {vacancyTags}
            </ul>

            <button className="vacancy-card__btn">Nu bekijken</button>
        </li>
    )
}

export default SearchVacancyCard;