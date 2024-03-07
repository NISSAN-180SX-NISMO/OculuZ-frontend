import React from 'react';
import styles from './ChannelHeadStyle.module.css';
import Avatar from "../../../UI/Atoms/Avatar/Avatar";
import ChannelHeadHeader from "./ChannelHeadHeader/ChannelHeadHeader";

const ChannelHead = ({avatarUrl, headerUrl, username, registDate, videosCount, subscribersCount}) => {
    return (
        <div className={styles.channelHeadBody}>
            <div className={styles.channelHeadHeader}>
                <ChannelHeadHeader headerUrl={headerUrl}/>
            </div>
            <div className={styles.channelInfoBody}>
                <div className={styles.avatar}><Avatar avatarUrl={avatarUrl}/></div>
                <div className={styles.channelInfo}>
                    <div className={styles.channelName}>{username}</div>
                    <div className={styles.registDate}>Дата регистрации:{' '}{registDate}</div>
                    <div className={styles.channelStats}>
                        <div>Видео:{' '}{videosCount}</div>
                        <div>Подписчики:{' '}{subscribersCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelHead;