import { LOGIN, LOGOUT, SET_AUTH, CHECK_AUTH } from './action-types';

const initialState = {
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:           
            return {
                isAuth: true
            };
        case LOGOUT:
            return {
                isAuth: false
            };
        case SET_AUTH:
            return {
                isAuth: true,
            };
        case CHECK_AUTH:
            return {
                isAuth: state.isAuth,
            }
        default:
            return state;
    };
};

export default authReducer;
