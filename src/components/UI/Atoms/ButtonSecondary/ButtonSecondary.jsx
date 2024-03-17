import React from 'react';
import ButtonStyle from './ButtonSecondaryStyle.module.css';

const ButtonSecondary = ({...props}) => {
    return (
        <button {...props} className={ButtonStyle.btnBody}>
            {props.children}
        </button>
    );
};

export default ButtonSecondary;