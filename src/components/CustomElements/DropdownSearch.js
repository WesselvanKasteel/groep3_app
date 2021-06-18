import React, { useState, useEffect } from 'react';

// scss
import './DropdownSearch.css';

// icons
import ArrowDropdown from '../../assets/svg/arrow_drop_down.svg';

const DropdownSearch = ({ options ,updateFilterItems, activeFilter, changeActiveFilter}) => {

    const [active, setActive] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setActive(activeFilter);
    }, [activeFilter])

    let filterdList = options.filter((val) => {
        if (searchTerm === '') {
            return val
        } else if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
        }
    }).map((option, index) => 
        <li 
            className={options.length > 3 ? 'dropdown-search__menu__options__item dropdown-search__menu__options__item-scroll' : 'dropdown-search__menu__options__item'} 
            key={option}
            onClick={() => updateFilterItems(option, index)}
        >
            <h2 className="dropdown-search__menu__options__item__title">{ option }</h2>
            <span className="dropdown-search__menu__options__item__add">+</span>
        </li>
    ); 

    if (options.length === 0 ) {
        filterdList = <p className="dropdown-search__menu__options__item__null">Geen vaardigheden gevonden.</p>
    }

    return (
        <div className="dropdown-search">
            <div className="dropdown-search__button">
                <button className="dropdown-search__button__btn" onClick={() => { 
                    const newActive = {search: !active.search, date: false, employment: false};
                    setActive(newActive);
                    changeActiveFilter(newActive); 
                }}>Vaardigheden</button>
                <img className={!activeFilter.search ? 'dropdown-search__button__icon dropdown-search__button__icon-close' : 'dropdown-search__button__icon dropdown-search__button__icon-open'} src={ ArrowDropdown } alt="search icon" />
            </div>
            <div className={!activeFilter.search ? "dropdown-search__menu  dropdown-search__menu-close" : 'dropdown-search__menu dropdown-search__menu-open'}>
                <input className="dropdown-search__menu__input" type="text" placeholder="Zoek vaardigheid" onChange={(event) => setSearchTerm(event.target.value)}/>

                <ul className={options.length > 3 ? 'dropdown-search__menu__options dropdown-search__menu__options-none' : 'dropdown-search__menu__options dropdown-search__menu__options-scroll '}>
                    {filterdList}
                </ul>
            </div>
        </div>
    )
}

export default DropdownSearch;