// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Products from './pages/Products';
import './index.css';  // Se você tiver um arquivo CSS, certifique-se de importá-lo

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <App>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </App>
    </Router>
);
