import React, { useEffect } from 'react';

// scss
import './SearchProfileList.css';

// components
import SearchProfileCard from './SearchProfileCard';

const SearchProfileList = ({ profiles }) => {

    useEffect(() => {
        // console.log(vacancies);
    }, [profiles])

    const profileList = profiles.map((profile, index) =>
        <SearchProfileCard data={profile} key={profile.first_name} />
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