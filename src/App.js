import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './context';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";

function App() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true');
    const [isLoading, setLoading] = useState(true);

    const isTokenExpired = (token) => {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/'; // обновляем страницу, переходя на корневую страницу сайта
    };

    const login = (token) => {
        localStorage.setItem('authToken', token);
        window.location.href = '/'; // обновляем страницу, переходя на корневую страницу сайта
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token && !isTokenExpired(token)) {
            setIsAuth(true);
            localStorage.setItem('isAuth', 'true');
            console.log('auth true');
        } else {
            setIsAuth(false);
            localStorage.setItem('isAuth', 'false');
            console.log('auth false');
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
            logout,
            login
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;