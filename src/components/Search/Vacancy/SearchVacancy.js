import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchVacancyFilter from './SearchVacancyFilter';
import SearchVacancyList from './SearchVacancyList';

import ArrowDirection from '../../../assets/svg/arrow_direction.svg';
import './SearchVacancy.css';

const SearchVacancy = () => {

    // States
    const [vacancyList, setVacancyList] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const [filterItemsList, setFilterItemsList] = useState([]);
    const [filterSearchTerm, setFilterSearchTerm] = useState('');
    const [filterSearchTermList, setFilterSearchTermList] = useState([]);
    const [filterVacancies, setFilterVacancies] = useState([]);

    useEffect(() => {
        getVacancies();
    }, []);

    useEffect(() =>{
        filterVacancySearchTerm();
        filterVacancyItems();
    }, [filterItems, filterSearchTerm])

    const getVacancies = async () =>{

        // const config = {
        //     headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }
        // };

        // axios.get(BASE_URL + '/api/vacancy/vacancies', config).then(res =>{
        //     setVacancyList(res.data);       
        //     setFilterVacancies(res.data);   
        // })

        await axios({ method: 'GET', url: '/app/api/vacancy/vacancies', 
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'POST',
            }, 
        })
        .then(res => {
            setVacancyList(res.data);       
            setFilterVacancies(res.data);   
        });
    }

    // update filterItems
    const updateFilterState = (list, searchTerm) => { 
        setFilterItems(list);
        setFilterSearchTerm(searchTerm); 
    }

    const filterVacancySearchTerm = () =>{

        if(!filterSearchTerm){
            setFilterSearchTermList(vacancyList);
        }
        else{
            setFilterSearchTermList(vacancyList.filter(vacancy => {return vacancy.title.toLowerCase().indexOf(filterSearchTerm.toLowerCase()) !== -1 })) 
        }
    }


    const filterVacancyItems = () => {
        
        if (filterItems.length === 0){
            setFilterVacancies(filterSearchTermList)
        } 
        else {
            setFilterVacancies(filterSearchTermList.filter(vacancy => {return vacancy.skills.map(skill => skill.skill).includes(filterItems.map(item => item.item).toString())}))
        }
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
            </div>
        </section>
    )
}

export default SearchVacancy;
