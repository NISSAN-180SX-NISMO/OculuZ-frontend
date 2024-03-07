import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LogoAltStyle.module.css'; // Импортируйте стили

const Logo = () => {
    return (
        <Link to="/" className={styles.logoContainer}>
            <img src={"/resources/OculuZLogo_v2.png"} alt="Logo" className={styles.logoImg} />
        </Link>
    );
};

export default Logo;