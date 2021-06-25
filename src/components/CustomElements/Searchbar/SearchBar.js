import React, { useState, useEffect } from 'react';

import Search from '../../../assets/svg/search.svg';
import './SearchBar.css';

const SearchBar = ({ updateSearchTerm }) => {

    const [placeholder, setPlaceholder] = useState('Functie');
    const [searchTerm, setSearchterm] = useState('');

    useEffect(() => {

        // update parent when searchTerm changes
        updateSearchTerm(searchTerm);
        
    }, [searchTerm, updateSearchTerm]);

    return (
        <div className="searchbar">
            <input className="searchbar__input" 
                type="text" 
                placeholder={placeholder} 
                onChange={event => setSearchterm(event.target.value)} 
            />
            <img className="searchbar__icon" src={Search} alt="search icon" />
        </div>
    )
}

export default SearchBar;
