import React from 'react';
import styles from './InputStyle.module.css';

const Input = ({...props}) => {
    return (
        <input className={styles.inputBody} {...props}>

        </input>
    );
};

export default Input;