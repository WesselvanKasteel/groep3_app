import React, { useState, useEffect } from 'react';

// scss
import './DropdownEmployment.css';

// icons
import ArrowDropdown from '../../assets/svg/arrow_drop_down.svg';

const DropdownEmployment = ({ options, updateEmploymentItems, activeFilter, changeActiveFilter }) => {

    const [active, setActive] = useState(null);

    useEffect(() => {
        setActive(activeFilter);
    }, [activeFilter])

    let optionsList = options.map((option, index) => 
        <li className="dropdown-employment__menu__options__item" key={option} onClick={() => updateEmploymentItems(option, index)}>
            <h2 className="dropdown-employment__menu__options__item__title">{ option }</h2>
            <span className="dropdown-employment__menu__options__item__add">+</span>
        </li>
    ); 

    if (options.length === 0) {
        optionsList = <p className="dropdown-employment__menu__options__item__null">Geen dienstverband gevonden.</p>
    }

    return (
        <div className="dropdown-employment">
            <div className="dropdown-employment__button">
                <button className="dropdown-employment__button__btn" onClick={() => {
                    const newActive = {search: false, date: false, employment: !active.employment};
                    setActive(newActive);
                    changeActiveFilter(newActive); 
                }}>Dienstverband</button>
                <img className={!activeFilter.employment ? 'dropdown-employment__button__icon dropdown-employment__button__icon-close' : 'dropdown-employment__button__icon dropdown-employment__button__icon-open'} src={ ArrowDropdown } alt="search icon" />
            </div>
            <div className={!activeFilter.employment ? "dropdown-employment__menu  dropdown-employment__menu-close" : 'dropdown-employment__menu dropdown-employment__menu-open'}>
                <ul className="dropdown-employment__menu__options">
                    { optionsList }
                </ul>
            </div>
        </div>
    )
}

export default DropdownEmployment;