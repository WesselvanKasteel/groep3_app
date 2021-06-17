import React from 'react';

<<<<<<< HEAD
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
=======
import Header from './components/Header/Header';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
>>>>>>> development-matt
import UserProfile from './components/UserProfile/UserProfile';
import UserProfileEdit from './components/UserProfile/UserProfileEdit';
import Record from './components/Record/Record';
import SearchVacancy from './components/Search/Vacancy/SearchVacancy';

<<<<<<< HEAD
import { Route, BrowserRouter as Router } from 'react-router-dom';
=======
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
>>>>>>> development-matt

const App = () => {
    return(
        <Router>
        <Header />
            <Switch>
                <Route exact path="/" component={SearchVacancy} />
                <Route exact path="/login" component={Login}/>
                <Route exact path="/registreer" component={Register} />
                <Route exact path="/profiel" component={UserProfile} />
                <Route exact path="/profiel-bewerken" component={UserProfileEdit} />
                <Route exact path="/maak-video" component={Record} />
                <Route default component={SearchVacancy} />
            </Switch>
        </Router>
    );
};

export default App;
