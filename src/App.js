import React from 'react';

import Login from './components/Auth/Login/Login';
import UserProfile from './components/UserProfile';
import UserProfileEdit from './components/UserProfileEdit';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const App = () => {
    return(
        <Router>
            <section>
                <Route path="/login" component={Login} />
                <Route path="/profile" component={UserProfile} />
                <Route path="/profile-edit" component={UserProfileEdit} />
            </section>
        </Router>
    );
};

export default App;
