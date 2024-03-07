import React from 'react';
import Avatar from "../../../UI/Atoms/Avatar/Avatar";
import styles from './UserHeadStyle.module.css';


const UserHead = ({avatarUrl, username, registDate}) => {
    return (
        <div className={styles.userHeadBody}>
            <div className={styles.avatar}><Avatar avatarUrl={avatarUrl}/></div>
            <div className={styles.userInfo}>
                <div className={styles.username}>{username}</div>
                <div className={styles.registDate}>Дата регистрации:{' '}{registDate}</div>
            </div>

        </div>
    );
};

export default UserHead;