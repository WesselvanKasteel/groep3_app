import React, { useState, useEffect } from 'react';
import axios from 'axios';

// scss
import './SearchProfile.css';

// icons
import ArrowDirection from '../../../assets/svg/arrow_direction.svg';

// components
import SearchProfileFilter from './SearchProfileFilter';
import SearchProfileList from './SearchProfileList';
const SearchVacancy = () => {

    // States
    const [ProfileList, setVacancyList] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const [filterSearchTerm, setFilterSearchTerm] = useState('');
    const [filterVacancies, setFilterVacancies] = useState([]);

    useEffect(() => {
        getProfiles();
    }, []);

    const getProfiles = () =>{
        const BASE_URL ="http://localhost:8000/api/vacancies";
        axios.get(BASE_URL).then(res =>{
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

    const filteringVacancies = () =>{
        const filteredVacancies = vacancyList.filter(vacancy =>{
            const searchText = filterSearchTerm.toLowerCase();
            const searchTags = filterItems.item 
            return (
                vacancy.title.indexOf(searchText)!==-1 ||
                vacancy.searchTags.indexOf(searchTags) >= 0
            );
           
        })
        console.log(filteredVacancies);
    }

    return (
        <section className="search">
            <div className="search__container">
                <div className="search__container__title">
                    <h1 className="search__container__title-search">Zoeken</h1>
                    <img className="search__container__title-arrow_down" src={ArrowDirection} alt="arrow" />
                </div>
                <SearchVacancyFilter updateFilterState={updateFilterState} />
                {/* <SearchVacancyList vacancies={filteringVacancies} /> */}
                <SearchVacancyList profiles={vacancyList} />
            </div>
        </section>
    )
}

export default SearchProfile;