import React, { useState, useEffect } from 'react';

// css
import './SearchVacancyFilter.scss';

// components
import SearchBar from '../../CustomElements/SearchBar';
import DropdownSearch from '../../CustomElements/DropdownSearch';

const SearchVacancyFilter = () => {

    const [searchTerm, setSearchTerm] = useState('');

    // update searchTerm from child
    const updateSearchTerm = (term) => { setSearchTerm(term); }

    useEffect(() => {

        console.log(searchTerm);

    }, [searchTerm]);

    return (
        <section className="filter">
            <ul className="filter__container">
                <li className="filter__container__search">
                    <SearchBar updateSearchTerm={updateSearchTerm}/>
                </li>       
                <li className="filter__container__radius">
                    <DropdownSearch />
                </li>
                <li className="filter__container__skills">

                </li>
                <li className="filter__container__date">
                    
                </li>
                <li className="filter__container__employment">

                </li>
            </ul>
        </section>  
    )
}

export default SearchVacancyFilter;