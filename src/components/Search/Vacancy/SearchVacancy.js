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

    useEffect(() =>{
        filterVacancyList();
    }, [filterItems])

    const getVacancies = () =>{

        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const BASE_URL ="http://localhost:8000/api/vacancies";
        axios.get(BASE_URL).then(res =>{
            setVacancyList(res.data);            
            setFilterVacancies(res.data);        
        })
    }

    // update filterItems
    const updateFilterState = (list, searchTerm) => { 
        setFilterItems(list);
        setFilterSearchTerm(searchTerm); 

        // setFilterVacancies(vacancyList.filter(vacancy => {return vacancy.title.toLowerCase().indexOf(filterSearchTerm.toLowerCase()) !== -1 }))
        // setFilterVacancies(vacancyList.filter(vacancy => {return vacancy.skills.map(skill => skill.skill).includes(filterItems.map(item => item.item).toString())}))

        console.log("filteritems: " + filterItems.map(item => item.item))
        console.log(filterVacancies);
        console.log(list);
        console.log(searchTerm);
    }

    const filterVacancyList = () => {
        // setFilterVacancies(vacancyList.filter(vacancy => {return vacancy.title.toLowerCase().indexOf(filterSearchTerm.toLowerCase()) !== -1 }))
        setFilterVacancies(vacancyList.filter(vacancy => {return vacancy.skills.map(skill => skill.skill).includes(filterItems.map(item => item.item).toString())}))
        console.log("filteritems: " + filterItems.map(item => item.item.toString()))
    }

    return (
        <section className="search">
            <div className="search__container">
                <div className="search__container__title">
                    <h1 className="search__container__title-search">Zoeken</h1>
                    <img className="search__container__title-arrow_down" src={ArrowDirection} alt="arrow" />
                </div>
                <SearchVacancyFilter updateFilterState={updateFilterState} />
                <SearchVacancyList vacancies={filterVacancies} />
                {/* <SearchVacancyList vacancies={vacancyList} /> */}
            </div>
        </section>
    )
}

export default SearchVacancy;