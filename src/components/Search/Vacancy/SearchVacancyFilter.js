import React, { useState, useEffect } from 'react';

// css
import './SearchVacancyFilter.scss';

// components
import SearchBar from '../../CustomElements/SearchBar';
import DropdownSearch from '../../CustomElements/DropdownSearch';
import DropdownEmployment from '../../CustomElements/DropdownEmployment';
import DropdownDate from '../../CustomElements/DropdownDate';
import RadiusSlider from '../../CustomElements/RadiusSlider';

const SearchVacancyFilter = () => {

    // hardcode
    const [searchOptions, setSearchOptions] = useState(['Html', 'Css', 'Javascript', 'Laravel']);
    const [dateOptions, setDateOptions] = useState(['Vandaag', 'Afgelopen week', 'Afgelopen maand', 'Afgelopen jaar']);
    const [employmentOptions, setEmploymentOptions] = useState(['Fulltime', 'Parttime', 'Tijdelijk', 'Freelance / ZZP']);

    // state 
    const [activeFilter, setActiveFilter] = useState({search: false, date: false, employment: false});

    const [searchTerm, setSearchTerm] = useState('');
    const [searchRadius, setSearchRadius] = useState(0);
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

    const updateRadiusValue = (value) => {
        setSearchRadius(value);
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
        console.log(searchRadius);

    }, [searchTerm, filterItems, searchOptions, employmentOptions, activeFilter, searchRadius]);

    return (
        <section className="filter">
            <ul className="filter__container">
                <li className="filter__container__search">
                    <SearchBar updateSearchTerm={updateSearchTerm} />
                </li>       
                <li className="filter__container__radius">
                    <RadiusSlider distance={searchRadius} updateRadiusValue={updateRadiusValue}/>
                </li>
                <li className="filter__container__skills">
                    <DropdownSearch 
                        options={searchOptions} 
                        updateFilterItems={updateFilterItems}

                        activeFilter={activeFilter}
                        changeActiveFilter={changeActiveFilter}
                    />
                </li>
                <li className="filter__container__date">
                    <DropdownDate 
                        options={dateOptions} 
                        updateDateItems={updateDateItems}

                        activeFilter={activeFilter}
                        changeActiveFilter={changeActiveFilter}
                    />
                </li>
                <li className="filter__container__employment">
                    <DropdownEmployment 
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