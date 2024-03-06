import React from 'react';
import styles from './NavbarStyle.module.css';
import ItemButton from "../../Atoms/ItemButton/ItemButton";

const Navbar = () => {
    return (
        <div className={styles.navbarBody}>
            <ItemButton>Рекомендации</ItemButton>
            <ItemButton>В тренде</ItemButton>
            <ItemButton>Подписки</ItemButton>
            <br/>
            <ItemButton>Мой канал</ItemButton>
            <ItemButton>История</ItemButton>
        </div>
    );
};

export default Navbar;