import React from 'react';
import styles from './AvatarStyle.module.css';

const Avatar = ({avatarUrl, ...props}) => {
    return (
        <div className={styles.avatarBody}>
            <picture {...props} >
                <source srcSet={avatarUrl}/>
                <img className={styles.avatar}
                     src='../../../../../public/resources/userMenuIconButton.png'
                />
            </picture>
        </div>
    );
};

export default Avatar;