import React from 'react';
import styles from './InputStyle.module.css';

const Input = ({...props}) => {
    return (
        <input className={`${styles.inputBody} ${props.error ? styles.error : ''}`} {...props} />
    );
};

export default Input;