import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Register.scss';

const Register = () => {
    //onChange={(e) => setProfilePicture(e.target.files)}
    const [firstName, setFirstName] = useState(null);
    const [prefix, setPrefix] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [country, setCountry] = useState(null);
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [password, setPassword] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
//    const [profilePicture, setProfilePicture] = useState('');

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
//            profilePicture: profilePicture
        }
        const res = await axios.post('http://127.0.0.1:8000/api/auth/register', registerData);
        console.log(res.data);
    }

    return(
        <section>
            <h2>Registreer</h2>
            <form method="post" onSubmit={registerHandler}>
                <div>
                    <label htmlFor="firstName">Voornaam:</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="prefix">Prefix: </label>
                    <input
                        type="text"
                        name="prefix"
                        id="prefix"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Achternaam:</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="country">Land:</label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="province">Provincie:</label>
                    <input
                        type="text"
                        name="province"
                        id="province"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="city">Stad:</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="address">Adres:</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Telefoonnummer:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Wachtwoord:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="dateOfBirth">Geboortedatum:</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </div>
                <a href="#">Wachtwoord vergeten?</a>
                <p>Al een account? <Link to="/login">Log hier in.</Link></p>
                <button>Registreer</button>
            </form>
        </section>
    );
};

export default Register;
