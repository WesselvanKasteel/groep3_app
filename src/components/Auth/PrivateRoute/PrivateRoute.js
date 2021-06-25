import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CHECK_AUTH, CHECK_ROLE, SET_AUTH, SET_ROLE } from '../../../store/action-types';
import axios from 'axios';

const PrivateRoute = ({ path, component, exact, requiredRole }) => {
    const dispatch = useDispatch();
    const role = useSelector(state => state.role.role);
    const isAuth = useSelector(state => state.auth.isAuth);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [activeRole, setActiveRole] = useState('');

    useEffect(() => {
        setRoleHandler();
    }, []);

    const setRoleHandler = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const res = await axios.get('http://127.0.0.1:8000/api/auth/check-user-role', config);
        dispatch({
            type: SET_ROLE,
            payload: res.data.role,
        });
        dispatch({
            type: SET_AUTH,
            payload: res.data.auth,
        });

        getUserRole();
        setAuth();
        checkAuth();

    }

    const getUserRole = () => {
        dispatch({
            type: CHECK_ROLE,
        });
    }

    const setAuth = () => {
        dispatch({
            type: SET_AUTH,
        });
    }

    const checkAuth = () => {
        dispatch({
            type: CHECK_AUTH,
        });
    }
    
    return requiredRole === role && isAuth
        ? <Route path={path} component={component} exact={exact} />
        : <Redirect to="/inloggen" />


    // const config = {
    //     method: 'get',
    //     url: 'http://127.0.0.1:8000/api/auth/check',
    //     headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    // }
    
    // const fetchUserAuth = async () => {
    //     const res = await axios.get(config);
    //     console.log(res);
    //     axios(config)
    //     .then(response => {   
    //         if (response.data.auth) {
    //             setIsLoading(false);
    //             setIsLoggedIn(true);
    //         }
    //     }, (error) => {
    //         console.log(error);

    //         setIsLoading(false);
    //         setIsLoggedIn(false);
    //         setActiveRole(response.data.role);
    //     });

    //     setIsLoading(false);
    //     setIsLoggedIn(true);
    //     setActiveRole('unemployed');
    // }

    // return isLoading 
    //     ? null 
    //     : isLoggedIn && activeRole === userRole 
    //     ? <Route path={path} component={component} exact={exact}/> 
    //     : <Redirect to="/inloggen" />    
}

export default PrivateRoute;
