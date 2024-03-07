// IconButton.jsx
import React from 'react';
import styles from './IconButtonStyle.module.css';

const IconButton = ({iconPath = "none", alt, onClick, ...props}) => {
    const handleClick = (event) => {
        event.stopPropagation();
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <div className={styles.btnBody} onClick={handleClick}>
            {
                iconPath === "none" ?
                    props.children
                    :
                    <img src={iconPath} alt={alt} className={styles.icon}/>
            }

        </div>
    );
};

export default IconButton;