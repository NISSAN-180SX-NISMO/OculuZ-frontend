import React from 'react';
import styles from './TabButtonStyle.module.css';

const TabButton = ({ onClick, active, children }) => {
    const btnClass = active ? `${styles.btnBody} ${styles.active}` : styles.btnBody;

    return (
        <button className={btnClass} onClick={onClick}>
            {children}
        </button>
    );
};

export default TabButton;