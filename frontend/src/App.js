// src/App.js

import React from 'react';
import Navbar from './components/Navbar';

const App = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div>{children}</div>
        </div>
    );
};

export default App;
