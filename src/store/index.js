import { createStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';

const reducers = combineReducers({
    auth: authReducer,
});

const store = createStore(reducers);

export default store;
