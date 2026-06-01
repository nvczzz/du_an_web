import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import standard Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import our custom modern Emerald Glassmorphism CSS styling
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);