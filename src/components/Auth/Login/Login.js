import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

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
            <form method="post" className="login__form" onSubmit={loginHandler}>
                <div className="login__form__container c1">
                    <label className="login__form__container__placeholder" htmlFor="email">E-mail</label>
                    <input
                        className="login__form__container__input"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={emailChangeHandler}
                        placeholder=" "
                    />
                </div>
                <div className="login__form__container">
                    <label className="login__form__container__placeholder" htmlFor="password">Wachtwoord</label>
                    <input
                        className="login__form__container__input"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={passwordChangeHandler}
                        placeholder=" "
                    />
                </div>
                <a className="login__form__forgot" href="#">Wachtwoord vergeten?</a>
                
                <button className="login__form__button">Login</button>
                <p>of</p>
                <Link className="login__form__register b2" to="/registreer">Registreer</Link>
            </form>
        </section>
    );
};

export default Login;
