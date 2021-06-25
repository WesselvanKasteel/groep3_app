import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CompanyProfile.css';

const CompanyProfileEdit = (props) => {
    const [profilePicture, setProfilePicture] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const res = await axios.get('https://vidvaso-p46oi.ondigitalocean.app/app/api/user', config);

        setAddress(res.data.user.address);
        setCity(res.data.user.city);
        setProvince(res.data.user.province);
        setCountry(res.data.user.country);
        setPhoneNumber(res.data.user.phone_number);
    }

    const profilePictureUpdateHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('picture', profilePicture);

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const res = await axios.post('https://vidvaso-p46oi.ondigitalocean.app/app/api/user/edit/picture', formData, config);
    };

    const profileUpdateHandler = async (event) => {
        event.preventDefault();

        const profileData = {
            address: address,
            city: city,
            province: province,
            country: country,
            phone_number: phoneNumber,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const profileRes = await axios.put('https://vidvaso-p46oi.ondigitalocean.app/app/api/user/edit', profileData, config);

        props.history.push('/bedrijfsprofiel');
    };

    const addressChangeHandler = (event) => {
        setAddress(event.target.value);
    }

    const cityChangeHandler = (event) => {
        setCity(event.target.value);
    }

    const provinceChangeHandler = (event) => {
        setProvince(event.target.value);
    }

    const countryChangeHandler = (event) => {
        setCountry(event.target.value);
    }

    const phoneNumberChangeHandler = (event) => {
        setPhoneNumber(event.target.value);
    }

    return(
        <section className ="companyprofileedit">
            <form className="companyprofileedit__form" onSubmit={profilePictureUpdateHandler} method="POST">
                <h2>Afbeelding</h2>
                <label htmlFor="profilePicture">Afbeelding:</label>
                <input
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                />
                <button className="companyprofileedit__form__button">Upload</button>
            </form>
            <form className="userprofileedit__form" onSubmit={profileUpdateHandler} method="POST">
                <h2>Algemene informatie</h2>

                <label htmlFor="address">Adres:</label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={addressChangeHandler}
                />
                <label htmlFor="city">Plaats:</label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={cityChangeHandler}
                />
                <label htmlFor="province">Provincie:</label>
                <input
                    type="text"
                    name="province"
                    id="province"
                    value={province}
                    onChange={provinceChangeHandler}
                />
                <label htmlFor="country">Land:</label>
                <input
                    type="text"
                    name="country"
                    id="country"
                    value={country}
                    onChange={countryChangeHandler}
                />
                <label htmlFor="phoneNumber">Telefoonnummer:</label>
                <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={phoneNumberChangeHandler}
                />

                <button className="userprofileedit__form__button userprofileedit__form__button--save">Opslaan</button>
                <button className="userprofileedit__form__button userprofileedit__form__button--cancel">
                    <Link to="/bedrijfsprofiel">Annuleren</Link>
                </button>
            </form>

        </section>
    );
};

export default CompanyProfileEdit;
