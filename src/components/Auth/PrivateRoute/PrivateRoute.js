import React, { useState, useEffect } from 'react';

// axios
import axios from 'axios';

// react router
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ path, component, exact, role }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeRole, setActiveRole] = useState('');

    useEffect(() => {

        console.log(path);
        console.log(component);
        console.log(exact);
        console.log(role);

        fetchUserAuth();
    }, []);

    const config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/auth/check',
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    }
    
    const fetchUserAuth = () => {
        // axios(config)
        // .then(response => {   
        //     if (response.data.auth) {
        //         setIsLoading(false);
        //         setIsLoggedIn(true);
        //     }
        // }, (error) => {
        //     console.log(error);

        //     setIsLoading(false);
        //     setIsLoggedIn(false);
        //     setActiveRole(response.data.role);
        // });

        setIsLoading(false);
        setIsLoggedIn(true);
        setActiveRole('unemployed');
    }

    return isLoading ? null : isLoggedIn && activeRole === role ?
        <Route path={path} component={component} exact={exact}/> :
        <Redirect to="/login" />
}

export default PrivateRoute;