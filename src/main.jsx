import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.scss'
import './styles/media.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-date-picker/dist/DatePicker.css';
import 'react-quill/dist/quill.snow.css';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
