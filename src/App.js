import React from 'react';

import TheHeader from './components/TheHeader/TheHeader';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import UserProfile from './components/UserProfile/UserProfile';
import UserProfileEdit from './components/UserProfile/UserProfileEdit';
import Record from './components/Record/Record';
import SearchVacancy from './components/Search/Vacancy/SearchVacancy';
import SearchProfile from './components/Search/Profile/SearchProfile';
import Vacancy from './components/Vacancy/Vacancy';
import CreateVacancy from './components/Vacancy/CreateVacancy';
import PageNotFound from './components/Error/PageNotFound';

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
                <Route exact path="/zoek-profiel" component={SearchProfile} />
                <Route exact path="/zoeken" component={SearchVacancy} />
                <Route exact path="/profiel" component={UserProfile} />
                <Route exact path="/inloggen" component={Login} />
                <Route exact path="/registreren" component={Register} />

                {/* <Route exact path="/zoeken" component={SearchVacancy} /> */}
                {/* <Route exact path="/profiel" component={UserProfile} /> */}
                {/* <Route exact path="/profiel-bewerken" component={UserProfileEdit} /> */}

                {/* <Route exact path="/maak-sollicitatievideo/:handle" component={Record} /> */}
                {/* <Route exact path="/vacature/:handle" component={Vacancy} /> */}

                <Route exact path="/maak-vacature" component={CreateVacancy} />

                <PrivateRoute path="/werkzoekende" component={UserProfile} exact={true} role="unemployed"/>
                <PrivateRoute path="/profiel-bewerken" component={UserProfileEdit} exact={true} role="unemployed"/>
                <PrivateRoute path="/zoeken" component={SearchVacancy} exact={true} role="unemployed"/>
                <PrivateRoute path="/maak-sollicitatievideo/:handle" component={Record} exact={true} role="unemployed"/>
                <PrivateRoute path="/vacature/:handle" component={Vacancy} exact={true} role="unemployed"/>
                
                {/* <PrivateRoute path="/create-vacature" component={CreateVacancy} exact={true} role="employer"/> */}

                <Route default component={PageNotFound} />
            </Switch>
        </Router>
    );
};

export default App;