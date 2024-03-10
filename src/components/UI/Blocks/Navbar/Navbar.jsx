import React, {useEffect, useState} from 'react';
import styles from './NavbarStyle.module.css';
import ItemButton from "../../Atoms/ItemButton/ItemButton";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const getUsername = () => {
    const token = localStorage.getItem('authToken');

    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.sub;
    } else {
        return null;
    }
};



const Navbar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(localStorage.getItem('username') || null);

    useEffect(() => {
        setUsername(localStorage.getItem('username') || null);
    }, [localStorage]);

    const handleRedirect = (path) => {
        if (username === null) {
            navigate(`/login?redirect=${window.location.pathname}`);
        } else {
            navigate(path);
        }
    };

    return (
        <div className={styles.navbarBody}>
            <ItemButton>Рекомендации</ItemButton>
            <ItemButton>В тренде</ItemButton>
            <ItemButton>Подписки</ItemButton>
            <br/>
            <ItemButton>Мой канал</ItemButton>
            <ItemButton onClick={() => handleRedirect(`/user/${username}/history`)}>История</ItemButton>
        </div>
    );
};

export default Navbar;