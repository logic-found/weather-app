import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import dotenv from 'dotenv';
// dotenv.config(); // Load environment variables from .env
// import 'dotenv-flow/config';

// require('dotenv').config();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);

reportWebVitals();
