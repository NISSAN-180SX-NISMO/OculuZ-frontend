import React from 'react';
import styles from './ChannelHeadStyle.module.css';
import Avatar from "../../../UI/Atoms/Avatar/Avatar";
import ChannelHeadHeader from "./ChannelHeadHeader/ChannelHeadHeader";
import SubButton from "../../../UI/Atoms/SubButton/SubButton";


const ChannelHead = ({avatarUrl, headerUrl, username, channelName, registDate, videosCount, subscribersCount}) => {
    return (
        <div className={styles.channelHeadBody}>
            <div className={styles.channelHeadHeader}>
                <ChannelHeadHeader headerUrl={headerUrl}/>
            </div>
            <div className={styles.channelInfoBody}>
                <div className={styles.avatar}><Avatar avatarUrl={avatarUrl}/></div>
                <div className={styles.channelInfoAndSubscribeButton}>
                    <div className={styles.channelInfo}>
                        <div className={styles.channelName}>{username}</div>
                        <div className={styles.registDate}>Дата регистрации:{' '}{registDate}</div>
                        <div className={styles.channelStats}>
                            <div>Видео:{' '}{videosCount}</div>
                            <div>Подписчики:{' '}{subscribersCount}</div>
                        </div>
                    </div>
                    <SubButton
                        username={username}
                        channelName={channelName}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChannelHead;