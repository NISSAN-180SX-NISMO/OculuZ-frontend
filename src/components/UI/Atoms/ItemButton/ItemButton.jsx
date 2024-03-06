import React from 'react';
import styles from './ItemButtonStyle.module.css';

const ItemButton = ({...props}) => {
    return (
        <button {...props} className={styles.btnBody}>
            {props.children}
        </button>
    );
};

export default ItemButton;