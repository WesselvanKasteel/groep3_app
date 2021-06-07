import React from 'react';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserProfile from './components/UserProfile';
import UserProfileEdit from './components/UserProfileEdit';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import Record from './components/Record/Record';

const App = () => {
    return(
        <Router>
            <section>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={UserProfile} />
                <Route path="/profile-edit" component={UserProfileEdit} />
            </section>
        </Router>
    );
};

export default App;
