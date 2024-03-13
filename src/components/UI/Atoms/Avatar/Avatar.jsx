import React, {useContext} from 'react';
import styles from './AvatarStyle.module.css';
import {AuthContext} from "../../../../context";

const Avatar = ({avatarUrl = "", ...props}) => {
    const {isAuth} = useContext(AuthContext);
    return (
        <div className={styles.avatarBody}>
            {avatarUrl === "" ?
                <div className={styles.avatar}>
                    {isAuth ? <div>(｡◕‿◕｡)</div> : <div>┌(ಠ_ಠ)┘</div>}
                </div>
                :
                <picture {...props} >
                    <source srcSet={avatarUrl}/>
                    <img className={styles.avatar}
                         src='../../../../../public/resources/userMenuIconButton.png'
                    />
                </picture>

            }

        </div>
    );
};

export default Avatar;