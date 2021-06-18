import React, { useEffect } from 'react';

// scss
import './SearchVacancyList.css';

// components
import SearchVacancyCard from './SearchVacancyCard';

const SearchVacancyList = ({ vacancies }) => {

    useEffect(() => {
        console.log(vacancies);
    }, [vacancies])

    const vacancyList = vacancies.map((vacancy, index) =>
        <SearchVacancyCard data={vacancy} key={vacancy.name} />
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