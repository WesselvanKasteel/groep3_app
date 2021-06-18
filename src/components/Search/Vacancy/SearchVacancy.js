import React, { useState, useEffect } from 'react';

import SearchVacancyFilter from './SearchVacancyFilter';
import SearchVacancyList from './SearchVacancyList';

import ArrowDirection from '../../../assets/svg/arrow_direction.svg';
import './SearchVacancy.css';

const SearchVacancy = () => {

    // hardcode
    const [vacancyList, setVacancyList] = useState([
        { name: 'Nike', duty: 'Lead UI designer', tags: ['javascript', 'laravel', 'sass'] },
        { name: 'North Face', duty: 'Graphic designer', tags: ['react', 'sass'] },
        { name: 'Albert Hijen', duty: 'Lead UI designer', tags: ['javascript', 'laravel', 'sass', 'node'] },
        { name: 'Jobanie World', duty: 'Graphic designer', tags: ['react', 'sass'] },
        { name: 'Goosland', duty: 'Lead UI designer', tags: ['javascript', 'laravel', 'sass'] },
        { name: 'MacDonalds', duty: 'Graphic designer', tags: ['react', 'sass'] },
    ]);

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
                    <img className="search__container__title-arrow_down" src={ArrowDirection} alt="arrow" />
                </div>
                <SearchVacancyFilter updateFilterState={updateFilterState} />
                <SearchVacancyList vacancies={vacancyList} />
            </div>
        </section>
    )
}

export default SearchVacancy;
