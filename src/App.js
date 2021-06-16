import React from 'react';

import Header from './components/Header/Header';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import UserProfile from './components/UserProfile/UserProfile';
import UserProfileEdit from './components/UserProfile/UserProfileEdit';
import Record from './components/Record/Record';
import SearchVacancy from './components/Search/Vacancy/SearchVacancy';

import { Route, BrowserRouter as Router } from 'react-router-dom';

const App = () => {
    return(
        <Router>
            <section>
                <Route path="/zoek-vacature" component={SearchVacancy} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={UserProfile} />
                <Route path="/profile-edit" component={UserProfileEdit} />
                <Route path="/make-video" component={Record} />
            </section>
        </Router>
    );
};

export default App;
