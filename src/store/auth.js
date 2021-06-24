import { LOGIN, LOGOUT } from './action-types';

const initialState = {
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            console.log(state.isAuth);
            return {
                isAuth: !state.isAuth,
            };
        case LOGOUT:
            return {
                isAuth: state.isAuth,
            };
        default:
            return state;
    };
};

export default authReducer;
