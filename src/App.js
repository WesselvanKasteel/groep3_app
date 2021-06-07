import React from 'react';

import Login from './components/Auth/Login/Login';
import RecordIntro from './components/Record/RecordIntro/RecordIntro';

import './App.scss';

const App = () => {
    return(
        <section>
            <Login />
            <RecordIntro />
        </section>
    );
};

export default App;
