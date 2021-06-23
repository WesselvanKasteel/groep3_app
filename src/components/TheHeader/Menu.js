import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Menu.css';

const Menu = ({ open, updateMenu }) => {
    const [menu, setMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setMenu(open);
    }, [open]);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsLoggedIn(true);
        }
    }, [localStorage.getItem('token')]);

    return (
        <section className={menu ? 'menu open' : 'menu'}>
            
            <NavLink className="menu__item" activeClassName="menu__item--active" to="/zoeken" onClick={() => updateMenu()}>Home</NavLink>

            {!isLoggedIn &&
                <NavLink className="menu__item" activeClassName="menu__item--active" to="/inloggen" onClick={() => updateMenu()}>Inloggen</NavLink>
            }
            {!isLoggedIn &&
                <NavLink className="menu__item" activeClassName="menu__item--active" to="/registreren" onClick={() => updateMenu()}>Registreren</NavLink>
            }
            {isLoggedIn &&
                <NavLink className="menu__item" activeClassName="menu__item--active" to="/profiel" onClick={() => updateMenu()}>Profiel</NavLink>
            }
            {isLoggedIn &&
                <NavLink className="menu__item" activeClassName="menu__item--active" to="/inloggen" onClick={() => updateMenu()}>Uitloggen</NavLink>
            }
        </section>
    )
}

export default Menu;
