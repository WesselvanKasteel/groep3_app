import React, { useState, useEffect } from 'react';

// css
import './SearchVacancyFilter.scss';

// components
import SearchBar from '../../CustomElements/SearchBar';
import DropdownSearch from '../../CustomElements/DropdownSearch';
import DropdownEmployment from '../../CustomElements/DropdownEmployment';
import DropdownDate from '../../CustomElements/DropdownDate';

const SearchVacancyFilter = () => {

    // hardcode
    const [searchOptions, setSearchOptions] = useState(['Html', 'Css', 'Javascript', 'Laravel']);
    const [dateOptions, setDateOptions] = useState(['Vandaag', 'Afgelopen week', 'Afgelopen maand', 'Afgelopen jaar']);
    const [employmentOptions, setEmploymentOptions] = useState(['Fulltime', 'Parttime', 'Tijdelijk', 'Freelance / ZZP']);

    // state 
    const [activeFilter, setActiveFilter] = useState({search: false, date: false, employment: false});

    const [searchTerm, setSearchTerm] = useState('');
    const [filterItems, setFilterItems] = useState([]);

    // update searchTerm from child
    const updateSearchTerm = (term) => { setSearchTerm(term); }
    
    // update filterItems with new option from child
    const updateFilterItems = (option, index) => { 

        // add clicked option to filterItems
        const item = searchOptions.splice(index, 1)[0];
        const newFilterItems = filterItems;
        newFilterItems.push(item);
        setFilterItems(newFilterItems);

        // remove clicked option from initial options
        const newSearchOptionsList = searchOptions.filter(item => item !== option);
        setSearchOptions(newSearchOptionsList);
    }

    // update filterItems with new employment item from child
    const updateEmploymentItems = (tag, index) => {
        // add clicked option to filterItems
        const item = employmentOptions.splice(index, 1)[0];
        const newFilterItems = filterItems;
        newFilterItems.push(item);
        setFilterItems(newFilterItems);

        // remove clicked option from initial options
        const newEmploymentOptionsList = employmentOptions.filter(item => item !== tag);
        setEmploymentOptions(newEmploymentOptionsList);
    }

    // update filterItems with new date item from child
    const updateDateItems = (tag, index) => {
        // add clicked tag to filterItems
        const item = dateOptions.splice(index, 1)[0];
        const newFilterItems = filterItems;
        newFilterItems.push(item);
        setFilterItems(newFilterItems);

        // remove clicked tag from initial options
        const newDateOptionsList = dateOptions.filter(item => item !== tag);
        setDateOptions(newDateOptionsList);
    }

    // update activeFilter
    const changeActiveFilter = (newActiveFilter) => {
        setActiveFilter(newActiveFilter);
    }

    useEffect(() => {

        // console.log(searchOptions);
        // console.log(employmentOptions);
        // console.log(searchTerm);
        // console.log(filterItems);
        // console.log(activeFilter);

    }, [searchTerm, filterItems, searchOptions, employmentOptions, activeFilter]);

    return (
        <section className="filter">
            <ul className="filter__container">
                <li className="filter__container__search">
                    <SearchBar updateSearchTerm={updateSearchTerm} />
                </li>       
                <li className="filter__container__radius">
                    
                </li>
                <li className="filter__container__skills">
                    <DropdownSearch 
                        name="vaardigheid" 
                        title="Vaardigheden" 
                        options={searchOptions} 
                        placeholder="Zoek vaardigheid" 
                        updateFilterItems={updateFilterItems}

                        activeFilter={activeFilter}
                        changeActiveFilter={changeActiveFilter}
                    />
                </li>
                <li className="filter__container__date">
                    <DropdownDate 
                        name="datum" 
                        title="Datum geplaats" 
                        options={dateOptions} 
                        updateDateItems={updateDateItems}

                        activeFilter={activeFilter}
                        changeActiveFilter={changeActiveFilter}
                    />
                </li>
                <li className="filter__container__employment">
                    <DropdownEmployment 
                        name="dienstverband" 
                        title="Dienstverband" 
                        options={employmentOptions} 
                        updateEmploymentItems={updateEmploymentItems}

                        activeFilter={activeFilter}
                        changeActiveFilter={changeActiveFilter}
                    />
                </li>
            </ul>
        </section>  
    )
}

export default SearchVacancyFilter;