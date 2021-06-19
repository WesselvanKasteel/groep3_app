import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

const Menu = ({ active }) => {
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        setMenu(active);
    }, [active]);

    return (
        <section className={menu ? 'menu active' : 'menu'}>
            <Link to="/"><h2>Home</h2></Link>
            <Link to="/login"><h2>Login</h2></Link>
            <Link to="/profiel"><h2>Profiel</h2></Link>
            <Link to="/maak-sollicitatievideo"><h2>Sollicitatie opnemen</h2></Link>
            <Link to="/login"><h2>Uitloggen</h2></Link>
        </section>
    )
}

export default Menu;
