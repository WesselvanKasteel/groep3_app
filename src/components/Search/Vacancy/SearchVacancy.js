import React, { useState, useEffect} from 'react';

// scss
import './SearchVacancy.scss';

// icons
import ArrowDirection from '../../../assets/svg/arrow_direction.svg';

// components
import SearchVacancyFilter from './SearchVacancyFilter';
import SearchVacancyList from './SearchVacancyList';
const SearchVacancy = () => {

    const [filterItems, setFilterItems] = useState([]);

    useEffect(() => {
        console.log(filterItems);
    }, [filterItems]);

    // update filterItems
    const updateFilterState = (list) => { setFilterItems(list) }

    return (
        <section className="search">
            <div className="search__container">
                <div className="search__container__title">
                    <h1 className="search__container__title-search">Zoeken</h1>
                    <img className="search__container__title-arrow_down" src={ ArrowDirection } alt="arrow" />
                </div>
                <SearchVacancyFilter updateFilterState={updateFilterState}/>
                <SearchVacancyList vacancies={[1, 2, 3, 4, 5, 6, 7]}/>
            </div>
        </section>
    )
}

export default SearchVacancy;