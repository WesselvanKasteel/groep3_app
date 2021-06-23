import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Register.css';

const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [prefix, setPrefix] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const registerHandler = async (event) => {
        event.preventDefault();

        const registerData = {
            first_name: firstName,
            prefix: prefix,
            last_name: lastName,
            country: country,
            province: province,
            city: city,
            address: address,
            email: email,
            phone_number: phoneNumber,
            password: password,
            date_of_birth: dateOfBirth,
        }
        const res = await axios.post('http://127.0.0.1:8000/api/auth/register', registerData);
        console.log(res.data);

        if(res.status === 200) {
            loginAfterRegisteringHandler();
        }
    }

    const loginAfterRegisteringHandler = async () => {
        const loginData = {
            email: email,
            password: password,
        };

        const res = await axios.post('http://127.0.0.1:8000/api/auth/login', loginData);
        console.log(res.data);

        localStorage.setItem("token", res.data.access_token);
        props.history.push('/profiel');

    }

    return(
        <section className="register">
            
            <form className="register__form" method="post" onSubmit={registerHandler}>
                <article className="register__form__article">
                    <h2 className="register__form__article__title t1">Contact Info</h2>
                        <div className="register__form__article__container">
                            <input
                                className="register__form__article__container__input"
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder=" "
                            />
                            <label className="register__form__article__container__placeholder"  htmlFor="firstName">Voornaam</label>
                        </div>
                        <div className="register__form__article__container"> 
                            <input
                                className="register__form__article__container__input"
                                type="text"
                                name="prefix"
                                id="prefix"
                                value={prefix}
                                onChange={(e) => setPrefix(e.target.value)}
                                placeholder=" "
                            />
                            <label className="register__form__article__container__placeholder" htmlFor="prefix">Tussenvoegsel</label>
                        </div>
                        <div className="register__form__article__container">
                            <input
                                className="register__form__article__container__input"
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder=" "
                            />
                            <label className="register__form__article__container__placeholder" htmlFor="lastName">Achternaam</label>
                        </div>
                        <div className="register__form__article__container"> 
                            <input
                                className="register__form__article__container__input"
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                placeholder=" "
                            />
                            <label className="register__form__article__container__placeholder" htmlFor="dateOfBirth">Geboortedatum</label>
                        </div>
                        <div className="register__form__article__container">
                            <input
                                className="register__form__article__container__input"
                                type="email"
                                name="email"__article
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=" "
                            />
                            <label className="register__form__article__container__placeholder" htmlFor="email">E-mail</label>
                        </div>
                        <div className="register__form__article__container">
                            <input
                                className="register__form__article__container__input"
                                type="tel"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder=" "
                            />
                            <label className="register__form__article__container__placeholder" htmlFor="phoneNumber">Telefoonnummer</label>
                        </div>
                </article>
                <article className="register__form__article">
                    <h2 className="register__form__article__title">Adres Info</h2>
                        <div className="register__form__article__container">
                            <input
                                className="register__form__article__container__input"
                                type="text"
                                name="country"
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder=" "
                            />
                            <label className="register__form__article__container__placeholder" htmlFor="country">Land</label>
                        </div>
                        <div className="register__form__article__container">
                            <input
                                className="register__form__article__container__input"
                                type="text"
                                name="province"
                                id="province"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                placeholder=" "
                            />
                            <label className="register__form__article__container__placeholder" htmlFor="province">Provincie</label>
                        </div>
                        <div className="register__form__article__container">
                            <input
                                className="register__form__article__container__input"
                                type="text"
                                name="city"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder=" "
                            />
                            <label className="register__form__article__container__placeholder" htmlFor="city">Stad</label>
                        </div>
                        <div className="register__form__article__container">
                            <input
                                className="register__form__article__container__input"
                                type="text"
                                name="address"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder=" "
                            />
                            <label className="register__form__article__container__placeholder" htmlFor="address">Adres</label>
                        </div>
                </article>
                <article className="register__form__article">
                    <h2 className="register__form__article__title">Account Info</h2>
                        <div className="register__form__article__container">
                            <input
                                className="register__form__article__container__input"
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" "
                            />
                            <label className="register__form__article__container__placeholder" htmlFor="password">Wachtwoord</label>
                        </div>
                </article>
                
                
                <button>Registreer</button>
                <p>Al een account? <Link to="/inloggen">Log hier in.</Link></p>
            </form>
        </section>
    );
};

export default Register;
