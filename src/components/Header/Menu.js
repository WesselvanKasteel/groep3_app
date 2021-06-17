import React, { useState, useEffect } from 'react';

// css
import './Menu.css';

const Menu = (active) => {

    const [menu, setMenu] = useState(false);

    useEffect(() => {

        setMenu(active.active);

    }, [active]);

    return (
        <section className={menu ? 'menu active' : 'menu'}>
            <h2>test</h2>
        </section>
    )
}

export default Menu;