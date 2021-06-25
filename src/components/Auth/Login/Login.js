import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SET_AUTH, LOGIN, LOGOUT, SET_ROLE } from '../../../store/action-types';
import { Link } from 'react-router-dom';

// test
import { useHistory } from "react-router-dom";

import './Login.css';

import Lock from '../../../assets/svg/lock.svg';
import Mail from '../../../assets/svg/email.svg';

const Login = (props) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const setRoleHandler = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const res = await axios.get('/app/api/auth/check-user-role', config);
        dispatch({
            type: SET_ROLE,
            payload: res.data.role,
        });
        dispatch({
            type: SET_AUTH,
            payload: res.data.auth,
        });
    }

    const loginHandler = async (event) => {
        event.preventDefault();
        dispatch({
            type: LOGIN,
        });

        // const loginData = {
        //     email: email,
        //     password: password,
        // }

        // const config = {
        //     headers: {
        //         'Access-Control-Allow-Origin' : '*', 
        //         'Access-Control-Allow-Methods' : 'POST'
        //     },
        //     data: {
        //         email: email,
        //         password: password,
        //     }
        // }

        // const res = await axios.post(BASE_URL + '/api/auth/login', config);

        const res = await axios({ method: 'POST', url: '/app/api/auth/login', 
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'POST',
            }, 
            data: {
                email: email,
                password: password,
            }
        });

        localStorage.setItem('token', res.data.access_token);
        
        setRoleHandler().then(() => props.history.push('/profiel'));
    }

    return(
        <section className="login">
            <Link to="/" className="login__title">
                <span className="login__title__blue-1">Vid</span>
                <span className="login__title__blue-2">Va</span>
                <span className="login__title__blue-3">So</span>
            </Link>
            <form method="post" className="login__form" onSubmit={loginHandler}>
                <div className="login__form__container c1">
                    <img className="login__form__container__icon" src={Mail} />
                    <input
                        className="login__form__container__input"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={emailChangeHandler}
                        placeholder=" "
                    />
                    <label className="login__form__container__placeholder" htmlFor="email">E-mail</label>
                </div>
                <div className="login__form__container">
                    <img className="login__form__container__icon" src={Lock} />
                    <input
                        className="login__form__container__input"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={passwordChangeHandler}
                        placeholder=" "
                    />
                    <label className="login__form__container__placeholder" htmlFor="password">Wachtwoord</label>
                </div>
                <button className="login__form__button">Inloggen</button>
                <p>Nog geen account? <Link className="login__form__register b2" to="/registreren">Registreer</Link></p>
            </form>
        </section>
    );
};

export default Login;
