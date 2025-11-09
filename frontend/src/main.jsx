import React from 'react'
import ReactDOM from 'react-dom/client'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Import your custom styles (must come AFTER bootstrap)
import './index.css'
import App from './App'

// This line finds the <div id="root"> and puts your App inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

