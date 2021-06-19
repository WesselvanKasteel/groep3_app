import React from 'react';

import TheHeader from './components/TheHeader/TheHeader';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import UserProfile from './components/UserProfile/UserProfile';
import UserProfileEdit from './components/UserProfile/UserProfileEdit';
import Record from './components/Record/Record';
import SearchVacancy from './components/Search/Vacancy/SearchVacancy';
import Vacancy from './components/Vacancy/Vacancy';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

const App = () => {
    return (
        <Router>
        <TheHeader />
            <Switch>
                <Route exact path="/" component={SearchVacancy} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registreer" component={Register} />
                <Route exact path="/profiel" component={UserProfile} />
                <Route exact path="/profiel-bewerken" component={UserProfileEdit} />
                <Route exact path="/maak-sollicitatievideo/:handle" component={Record} />
                <Route exact path="/vacature/:handle" component={Vacancy} />
                <Route default component={SearchVacancy} />
            </Switch>
        </Router>
    );
};

export default App;