// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <h1>Gestock</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Produtos</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
