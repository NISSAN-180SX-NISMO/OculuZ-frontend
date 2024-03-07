import React from 'react';
import MainPage from "../components/pages/MainPage/MainPage";
import LoginPage from "../components/pages/Auth/LoginPage";
import RegistPage from "../components/pages/Auth/RegistPage";
import UserPage from "../components/pages/UserPage/UserPage";



export const publicRoutes = [
    {path: '/login', element: <LoginPage />, exact: true},
    {path: '/regist', element: <RegistPage />, exact: true},
    {path: '/', element: <MainPage />, exact: true},
    {path: '/user/:username/:tab?', element: <UserPage/>, exact: true}
]


export const privateRoutes = [
    ...publicRoutes
]