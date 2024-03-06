import React from 'react';
import ButtonStyle from './ButtonStyle.module.css';

const Button = ({...props}) => {
    return (
        <button {...props} className={ButtonStyle.btnBody}>
            {props.children}
        </button>
    );
};

export default Button;