import React, { useState, useEffect } from 'react';

// css
import './DropdownSearch.scss';

// icons
import ArrowDropdown from '../../assets/svg/arrow_drop_down.svg';

const DropdownSearch = () => {

    const [placeholder, setPlaceholder] = useState('Zoekterm')

    const [menu, setMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState(['optie 1', 'optie 2', 'optie 3', 'optie 4']);

    useEffect(() => {

    }, []);


    let filterdList = options.map((option) => 
        <li className="dropdown__menu__options__item" key={option}>
            <h2 className="dropdown__menu__options__item__title">{ option }</h2>
        </li>
    ); 

    return (
        <div className="dropdown">
            <div className="dropdown__button">
                <button className="dropdown__button__btn" onClick={() => setMenu(!menu)}>Vaardigheden</button>
                <img className={!menu ? 'dropdown__button__icon dropdown__button__icon-close' : 'dropdown__button__icon dropdown__button__icon-open'} src={ ArrowDropdown } alt="search icon" />
            </div>
            <div className={!menu ? "dropdown__menu  dropdown__menu-close" : 'dropdown__menu dropdown__menu-open'}>
                <input className="dropdown__menu__input" type="text" placeholder={placeholder} onChange={(event) => setSearchTerm(event.target.value)}/>

                <ul className="dropdown__menu__options">
                    {filterdList}
                </ul>
            </div>
        </div>
    )
}

export default DropdownSearch;