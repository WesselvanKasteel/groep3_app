import React from 'react';

import TheHeader from './components/TheHeader/TheHeader';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import UserProfile from './components/UserProfile/UserProfile';
import UserProfileEdit from './components/UserProfile/UserProfileEdit';
import CompanyProfile from './components/CompanyProfile/CompanyProfile';
import CompanyProfileEdit from './components/CompanyProfile/CompanyProfileEdit';
import Record from './components/Record/Record';
import SearchVacancy from './components/Search/Vacancy/SearchVacancy';
import Vacancy from './components/Vacancy/Vacancy';
import CreateVacancy from './components/Vacancy/CreateVacancy';
import PageNotFound from './components/Error/PageNotFound';
import RecordIntroduction from './components/Record/User/RecordIntroduction';

// privateRoute route
import PrivateRoute from './components/Auth/PrivateRoute/PrivateRoute';

import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

const App = () => {
    return (
        <Router>
        <TheHeader />
            <Switch>

                <Route exact path="/">
                        <Redirect to="/zoeken" />
                </Route>

                <Route exact path="/inloggen" component={Login} />
                <Route exact path="/registreren" component={Register} />

                <Route exact path="/bedrijfsprofiel" component={CompanyProfile} />
                <Route exact path="/bedrijfsprofiel-bewerken" component={CompanyProfileEdit} />  
                <Route exact path="/maak-vacature" component={CreateVacancy} />

                <Route exact path="/zoeken" component={SearchVacancy} />

                <PrivateRoute path="/profiel" component={UserProfile} exact={true} role="unemployed"/>
                <PrivateRoute path="/profiel-bewerken" component={UserProfileEdit} exact={true} role="unemployed"/>
                <PrivateRoute path="/maak-sollicitatievideo/:handle" component={Record} exact={true} role="unemployed"/>
                <PrivateRoute path="/maak-kennismakingvideo" component={RecordIntroduction} exact={true} role="unemployed"/>
                <PrivateRoute path="/vacature/:handle" component={Vacancy} exact={true} role="unemployed"/>
                
                <Route default component={PageNotFound} />
            </Switch>
        </Router>
    );
};

export default App;
