import React, {useContext, useEffect, useState} from 'react';
import styles from './SidebarStyle.module.css';
import {jwtDecode} from 'jwt-decode';
import {AuthContext} from '../../../../context';
import ItemButton from "../../Atoms/ItemButton/ItemButton";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../../../services/AuthService";

const Sidebar = ({isOpen, onClose}) => {
    const {isAuth, logout} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
    }, []);

    const handleRedirect = (path) => {
        onClose();
        navigate(path);
    };

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            {isAuth ? (
                <>
                    <div className={styles.welcome}>Привет, {username}! (｡◕‿◕｡)</div>
                    <ItemButton onClick={() => handleRedirect(`/user/${username}`)}>Мой аккаунт</ItemButton>
                    <ItemButton onClick={() => handleRedirect(`/user/${username}/channels`)}>Мои каналы</ItemButton>
                    <ItemButton onClick={() => logout(window.location.pathname)}>Выход</ItemButton>
                </>
            ) : (
                <>
                    <div className={styles.welcome}>Вы не вошли в свой аккаунт ┌(ಠ_ಠ)┘</div>
                    <ItemButton onClick={() => handleRedirect(`/login?redirect=${window.location.pathname}`)}>Вход</ItemButton>
                    <ItemButton onClick={() => handleRedirect(`/regist?redirect=${window.location.pathname}`)}>Регистрация</ItemButton>
                </>
            )}
        </div>
    );
};


export default Sidebar;