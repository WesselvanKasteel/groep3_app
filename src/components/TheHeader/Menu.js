import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../store/action-types';

import axios from 'axios';

import './Menu.css';

const Menu = ({ open, updateMenu }) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);

    const [menu, setMenu] = useState(false);

    useEffect(() => {
        setMenu(open);
    }, [open]);

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    const logoutHandler = async () => {
        dispatch({
            type: LOGOUT
        });
        const res = await axios.post('https://vidvaso-p46oi.ondigitalocean.app/app/api/auth/logout', null, config);
    }

    return (
        <section className={menu ? 'menu open' : 'menu'}>
            <NavLink className="menu__item" activeClassName="menu__item--active" to="/zoeken" onClick={() => updateMenu()}>Home</NavLink>
            {!isAuth && (
                <Fragment>
                    <NavLink className="menu__item" activeClassName="menu__item--active" to="/inloggen" onClick={() => updateMenu()}>Inloggen</NavLink>
                    <NavLink className="menu__item" activeClassName="menu__item--active" to="/registreren" onClick={() => updateMenu()}>Registreren</NavLink>
                </Fragment>
            )}
            {isAuth && (
                <Fragment>
                    <NavLink className="menu__item" activeClassName="menu__item--active" to="/profiel" onClick={() => updateMenu()}>Profiel</NavLink>
                    <NavLink className="menu__item" activeClassName="menu__item--active" to="/inloggen" onClick={() => {logoutHandler(); updateMenu();}}>Uitloggen</NavLink>
                </Fragment>
            )}
        </section>
    );
}

export default Menu;
