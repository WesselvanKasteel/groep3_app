import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

const Menu = ({ active, updateMenu }) => {
    const [menu, setMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setMenu(active);
    }, [active]);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsLoggedIn(true);
        }
    }, [localStorage.getItem('token')]);

    return (
        <section className={menu ? 'menu active' : 'menu'}>
            
            <Link className="menu__item" to="/zoeken" onClick={() => updateMenu()}>Home</Link>

            {!isLoggedIn &&
                <Link className="menu__item" to="/inloggen" onClick={() => updateMenu()}>Inloggen</Link>
            }

            {isLoggedIn &&
                <Link className="menu__item" to="/profiel" onClick={() => updateMenu()}>Profiel</Link>
            }
            {isLoggedIn &&
                <Link className="menu__item" to="/inloggen" onClick={() => updateMenu()}>Uitloggen</Link>
            }
        </section>
    )
}

export default Menu;
