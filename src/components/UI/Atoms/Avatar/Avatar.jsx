import React, {useContext} from 'react';
import styles from './AvatarStyle.module.css';
import {AuthContext} from "../../../../context";

const Avatar = ({avatarUrl = "none", ...props}) => {
    const {isAuth} = useContext(AuthContext);
    return (
        <div className={styles.avatarBody}>
            {avatarUrl === "none" ?
                <picture {...props} >
                    <source srcSet={avatarUrl}/>
                    <img className={styles.avatar}
                         src='../../../../../public/resources/userMenuIconButton.png'
                    />
                </picture>
                :
                <div className={styles.avatar}>
                    {isAuth ? <div>(｡◕‿◕｡)</div> : <div>┌(ಠ_ಠ)┘</div>}
                </div>
            }

        </div>
    );
};

export default Avatar;