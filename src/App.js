import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './context';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {AuthService} from "./services/AuthService";
import {LoginRequest, SignupRequest} from "./model/AuthDTO.tsx";

function App() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true');
    const [isLoading, setLoading] = useState(true);

    const isTokenExpired = (token) => {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    };

    const logout = async (redirect = '/') => {
        await AuthService.signout();
        for (let key in localStorage) {
            console.log(key + ' = ' + localStorage[key]);
        }
        window.location.href = redirect || '/';
    };

    const login = async (loginRequest: LoginRequest, redirect = '/') => {
        await AuthService.signin(loginRequest);
        window.location.href = redirect || '/';
    }

    const signup = async (signupRequest: SignupRequest, redirect = '/') => {
        const response = await AuthService.signup(signupRequest);
        if (response.status === 200) {
            login(new LoginRequest({username: signupRequest.username, password: signupRequest.password}), redirect);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token && !isTokenExpired(token)) {
            const decodedToken = jwtDecode(token);
            console.log('App component: auth true for:');
            console.log('User name:', decodedToken.sub);
            console.log('Token issued at:', new Date(decodedToken.iat * 1000));
            console.log('Token expires at:', new Date(decodedToken.exp * 1000));

            setIsAuth(true);
            localStorage.setItem('isAuth', 'true');
        } else {
            setIsAuth(false);
            localStorage.setItem('isAuth', 'false');
            console.log('App component: auth false');
        }
        setLoading(false);
    }, [localStorage]);

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
            logout,
            login,
            signup
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;