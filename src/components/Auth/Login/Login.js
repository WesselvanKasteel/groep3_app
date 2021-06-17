import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.scss';

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
        localStorage.setItem("token",res.data.access_token);
        props.history.push("/profile");
    }

    return(
        <section>
            <h2>Login</h2>
            <form method="post" onSubmit={loginHandler}>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={emailChangeHandler}
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Wachtwoord:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={passwordChangeHandler}
                        placeholder="wachtwoord"
                    />
                </div>
                {/* <a href="#">Wachtwoord vergeten?</a> */}
                <p>Nog geen account? <Link to="/register">Registreer hier.</Link></p>
                <button>Login</button>
            </form>
        </section>
    );
};

export default Login;
