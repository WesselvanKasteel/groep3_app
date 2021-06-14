import React from 'react';

// css
import './SearchVacancy.scss';

// icons
import ArrowDirection from '../../../assets/svg/arrow_direction.svg';

// components
import SearchVacancyFilter from './SearchVacancyFilter';

const SearchVacancy = () => {

    return (
        <section className="search">
            <div className="search__container">
                <div className="search__container__title">
                    <h1 className="search__container__title-search">Zoeken</h1>
                    <img className="search__container__title-arrow_down" src={ ArrowDirection } alt="arrow" />
                </div>
                <SearchVacancyFilter />
            </div>
        </section>
    )
}

export default SearchVacancy;