import React from 'react';
import MainPage from "../components/pages/MainPage/MainPage";
import LoginPage from "../components/pages/Auth/LoginPage";
import RegistPage from "../components/pages/Auth/RegistPage";
import NotFoundPage from "../components/pages/NotFoundPage/NotFoundPage";
import UserPageWrapper from "../components/pageWrappers/UserPageWrapper";



export const publicRoutes = [

    {
        path: '/user/:username/:tab?',
        element: <UserPageWrapper />,
        exact: true
    },
    {path: '/login', element: <LoginPage/>, exact: true},
    {path: '/regist', element: <RegistPage/>, exact: true},
    {path: '/', element: <MainPage/>, exact: true},
    {path: '/404', element: <NotFoundPage/>, exact: true}
]

export const privateRoutes = [
    ...publicRoutes
]