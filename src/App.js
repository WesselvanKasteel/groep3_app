import React from 'react';

<<<<<<< HEAD
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
=======
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
>>>>>>> development-tim
import UserProfile from './components/UserProfile/UserProfile';
import UserProfileEdit from './components/UserProfile/UserProfileEdit';
import Record from './components/Record/Record';

import { Route, BrowserRouter as Router } from 'react-router-dom';

const App = () => {
    return(
        <Router>
            <section>
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
