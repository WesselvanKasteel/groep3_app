import { SET_ROLE, CHECK_ROLE } from './action-types';

const initialState = {
    role: '',
};

const roleReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ROLE: 
            return {
                role: action.payload,
            }
        case CHECK_ROLE:
            return {
                role: state.role,
            }
        default:
            return state;
    };
};

export default roleReducer;
