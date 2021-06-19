import React, { useEffect } from 'react';

// scss
import './SearchProfileList.css';

// components
import SearchProfileCard from './SearchProfileCard';

const SearchProfileList = ({ vacancies }) => {

    useEffect(() => {
        // console.log(vacancies);
    }, [vacancies])

    const profileList = vacancies.map((profile, index) =>
        <SearchProfileCard data={profile} key={profile.id} />
    );

    return (
        <section className="profile-list">
            <ul className="profile-list__list">
                {profileList}
            </ul>
        </section>
    )
}

export default SearchProfileList;