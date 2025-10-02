import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 1. Import Bootstrap's main CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. Import Bootstrap's icon font CSS (This adds the icons)
import 'bootstrap-icons/font/bootstrap-icons.css';

// 3. Import your custom global CSS (This adds the dark theme)
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
