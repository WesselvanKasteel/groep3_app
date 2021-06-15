import React from 'react';

// scss
import './SearchVacancyCard.scss';

const SearchVacancyCard = ({ data }) => {

    return (
        <li className="vacancy-card">
            <h2>{ data }</h2>
        </li>
    )
}

export default SearchVacancyCard;