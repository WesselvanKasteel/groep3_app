import React from 'react';

// scss
import './SearchVacancyList.scss';

// components
import SearchVacancyCard from './SearchVacancyCard';

const SearchVacancyList = ({ vacancies }) => {

    let vacancyList = vacancies.map((vacancy, index) => 
        <SearchVacancyCard data={vacancy} key={index}/>
    ); 

    return (
        <section className="vacancy-list">
            <ul className="vacancy-list__list">
                {vacancyList}
            </ul>
        </section>
    )
}

export default SearchVacancyList;