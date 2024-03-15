import React, {useContext, useEffect, useRef} from 'react';
import styles from './AvatarStyle.module.css';
import {AuthContext} from "../../../../context";

const Avatar = ({avatarUrl = "", ...props}) => {
    const avatarRef = useRef(null);

    useEffect(() => {
        if (avatarRef.current && avatarRef.current.offsetWidth < 100) {
            avatarRef.current.classList.add(styles.smallAvatar);
        }
    }, []);

    return (
        <div className={styles.avatarBody} ref={avatarRef}>
            {avatarUrl === "" ?
                <div className={styles.avatar}>
                    {localStorage.getItem("isAuth") === "true" ? <div className={styles.smile}>(｡◕‿◕｡)</div> : <div className={styles.smile}>┌(ಠ_ಠ)┘</div>}
                </div>
                :
                <picture >
                    <source srcSet={avatarUrl}/>
                    <img className={styles.avatar} {...props}
                         src={"C:/Users/User/Desktop/OculuZ/frontend/public/resources/defaultAvatar.jpeg"}
                         // src={"https://s3.timeweb.cloud/fd22a2a2-oculuz-media-storage/avatar/defaultAvatar.jpeg"}
                     alt={"avtr"}/>
                </picture>

            }

        </div>
    );
};

export default Avatar;