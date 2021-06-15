import React, { useState, useEffect } from 'react';

// scss
import './SearchBar.scss';

// icons
import Search from '../../assets/svg/search.svg';

const SearchBar = ({ updateSearchTerm }) => {

    const [placeholder, setPlaceholder] = useState('Bedrijfsnaam, vacature, zoekterm');
    const [searchTerm, setSearchterm] = useState('');

    useEffect(() => {

        // update parent when searchTerm changes
        updateSearchTerm(searchTerm);
        
    }, [searchTerm]);

    return (
        <div className="searchbar">
            <input className="searchbar__input" 
                type="text" 
                placeholder={placeholder} 
                onChange={event => setSearchterm(event.target.value)} 
            />

            <img className="searchbar__icon" src={ Search } alt="search icon" />
        </div>
    )
}

export default SearchBar;