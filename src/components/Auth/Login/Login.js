import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import Lock from '../../../assets/svg/lock.svg';
import Mail from '../../../assets/svg/email.svg';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        localStorage.removeItem("token");
    }, []);

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const loginHandler = async (event) => {
        event.preventDefault();

        const loginData = {
            email: email,
            password: password,
        }

        const res = await axios.post('http://127.0.0.1:8000/api/auth/login', loginData);
        console.log(res.data);
        localStorage.setItem("token", res.data.access_token);
        props.history.push("/profile");
    }

    return(
        <section className="login">
            {/* <h2>Login</h2> */}
            <Link to="/" className="login__title">
                <span className="login__title__blue-1">Vid</span>
                <span className="login__title__blue-2">Va</span>
                <span className="login__title__blue-3">So</span>
            </Link>
            <form method="post" className="login__form" onSubmit={loginHandler}>
                <div className="login__form__container c1">
                    <img className="login__form__container__icon" src={Mail}></img>
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
                    <img className="login__form__container__icon" src={Lock}></img>
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
                {/* <a className="login__form__forgot" href="#">Wachtwoord vergeten?</a> */}
                
                <button className="login__form__button">Login</button>
                <p>Nog geen account? <Link className="login__form__register b2" to="/registreer">Registreer</Link></p>
            </form>
        </section>
    );
};

export default Login;
