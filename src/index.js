import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";

import LeftNavBar from "./components/LeftNavBar";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Header/>
        <div className="app-container">
            <LeftNavBar/>
            <div className="main-content">
                {/* Здесь будет ваш главный контент */}
            </div>
        </div>
    </React.StrictMode>
);

