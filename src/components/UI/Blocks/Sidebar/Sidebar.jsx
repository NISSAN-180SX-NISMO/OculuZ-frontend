import React, {useContext, useEffect, useState} from 'react';
import styles from './SidebarStyle.module.css';
import {jwtDecode} from 'jwt-decode';
import {AuthContext} from '../../../../context';
import ItemButton from "../../Atoms/ItemButton/ItemButton";
import {Link} from "react-router-dom";

const Sidebar = ({isOpen, onClose}) => {
    const {isAuth, logout} = useContext(AuthContext);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.username);
        }
    }, []);



    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            {isAuth ? (
                <>
                    <div className={styles.welcome}>Welcome, {username}</div>

                    <ItemButton>Мой аккаунт</ItemButton>
                    <ItemButton>Мои каналы</ItemButton>
                    <ItemButton onClick={logout}>Выход</ItemButton>
                </>
            ) : (
                <>
                    <div className={styles.welcome}>Вы не вошли в свой аккаунт</div>
                    <Link to={'/login'}>
                        <ItemButton>Вход</ItemButton>
                    </Link>
                    <Link to={'/regist'}>
                        <ItemButton>Регистрация</ItemButton>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Sidebar;