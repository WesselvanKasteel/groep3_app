import React, { useState, useEffect } from 'react';
import axios from 'axios';

// scss
import './SearchVacancy.css';

// icons
import ArrowDirection from '../../../assets/svg/arrow_direction.svg';

// components
import SearchVacancyFilter from './SearchVacancyFilter';
import SearchVacancyList from './SearchVacancyList';
const SearchVacancy = () => {

    // States
    const [vacancyList, setVacancyList] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const [filterSearchTerm, setFilterSearchTerm] = useState('');
    const [filterVacancies, setFilterVacancies] = useState([]);

    useEffect(() => {
        getVacancies();
    }, []);

    const getVacancies = () =>{

        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const BASE_URL ="http://localhost:8000/api/vacancy/vacancies";
        axios.get(BASE_URL, config).then(res =>{
            setVacancyList(res.data);            
        })
    }

    // update filterItems
    const updateFilterState = (list, searchTerm) => { 
        setFilterItems(list);
        setFilterSearchTerm(searchTerm); 

        console.log(list);
        console.log(searchTerm);
    }

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