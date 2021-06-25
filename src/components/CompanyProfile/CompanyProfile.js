import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './CompanyProfile.css';

const CompanyProfile = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [province, setProvince] = useState('');
    const [email, setEmail] = useState('');

    const [image, setImage] = useState('');

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
        setCompanyName(res.data.user.company_name);
        setCountry(res.data.user.country);
        setPhoneNumber(res.data.user.phone_number);
        setProvince(res.data.user.province);
        setEmail(res.data.user.email);
        setImage(res.data.user.picture);
    }

    return (
        <div className="companyprofile">
            <section className="companyprofile-content">
                <section className="companyprofile-content__info">
                    {image !== "" &&
                        <img src={`data:image/jpg;base64,${image}`} className="companyprofile-content__info__img" alt="Profile" />
                    }
                    <div className="userprofile-content__info__text">
                        <p>{companyName}</p><br />
                        <p>{email}</p>
                    </div>
                </section>
                <button className="companyprofile-content__edit">
                    <Link className="companyprofile-content__edit__link" to="/bedrijfsprofiel-bewerken"><h2>Profiel bewerken</h2></Link>
                </button>
                <section className="companyprofile-content__grid">
                    <article className="companyprofile-content__grid__video companyprofile-content__card">
                        <h2>Algemene info </h2>
                        <p>Adres: {address}</p>
                        <p>Stad: {city}</p>
                        <p>Provincie: {province}</p>
                        <p>Land: {country}</p>
                        <p>Telefoonnummer: {phoneNumber}</p>
                    </article>

                </section>
            </section>
        </div>
    );
};

export default CompanyProfile;
