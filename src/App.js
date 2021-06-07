import React from 'react';

import Login from './components/Auth/Login/Login';
import UserProfile from './components/UserProfile';
import UserProfileEdit from './components/UserProfileEdit';

const App = () => {
    return(
        <section>
            <Login />
            <UserProfileEdit/>
        </section>
    );
};

export default App;
