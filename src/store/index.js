import { createStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import roleReducer from './role';

const reducers = combineReducers({
    auth: authReducer,
    role: roleReducer
});

const store = createStore(reducers);

export default store;
