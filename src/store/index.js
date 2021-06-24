import { createStore } from '@reduxjs/toolkit';

const initialState = {
    counter: 0,
}

const counterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return {
                counter: state.counter + 1,
            };
        default:
            return state;
    };
};

const store = createStore(counterReducer);

export default store;
