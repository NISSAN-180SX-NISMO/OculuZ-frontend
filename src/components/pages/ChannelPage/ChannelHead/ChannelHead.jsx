import React, {useState} from 'react';
import styles from './ChannelHeadStyle.module.css';
import Avatar from "../../../UI/Atoms/Avatar/Avatar";
import ChannelHeadHeader from "./ChannelHeadHeader/ChannelHeadHeader";
import SubButton from "../../../UI/Atoms/SubButton/SubButton";


const ChannelHead = ({
                         avatarUrl,
                         headerUrl,
                         username,
                         channelName,
                         registDate,
                         videosCount,
                         subscribersCount,
                         isSubscribed
                     }) => {

    const [subCount, setSubCount] = useState(subscribersCount);

    // let subscribeUser = async () => {
    //     console.log("Пытаемся подписаться на канал");
    //     await ChannelService.subscribe(channelName).then(response => {
    //         if (response.status === 200) {
    //             console.log("Подписались на канал");
    //             window.location.reload();
    //         } else {
    //             console.log("Не удалось подписаться на канал");
    //         }
    //     });
    // }
    //
    // let unsubscribeUser = async () => {
    //     console.log("Пытаемся отписаться от канала");
    //     await ChannelService.unsubscribe(channelName).then(response => {
    //         if (response.status === 200) {
    //             console.log("Отписались от канала");
    //             window.location.reload();
    //         } else {
    //             console.log("Не удалось отписаться от канала");
    //         }
    //     });
    // }

    return (
        <div className={styles.channelHeadBody}>
            <div className={styles.channelHeadHeader}>
                <ChannelHeadHeader headerUrl={headerUrl}/>
            </div>
            <div className={styles.channelInfoBody}>
                <div className={styles.avatar}>
                    <Avatar avatarUrl={avatarUrl}/>
                </div>
                <div className={styles.channelInfoAndSubscribeButton}>
                    <div className={styles.channelInfo}>
                        <div className={styles.channelName}>{channelName}</div>
                        <div className={styles.registDate}>Дата регистрации:{' '}{registDate}</div>
                        <div className={styles.channelStats}>
                            <div>Видео:{' '}{videosCount}</div>
                            <div>Подписчики:{' '}{subCount}</div>
                        </div>
                    </div>
                    <SubButton channelName={channelName} subCount={subCount} setSubCount={setSubCount} />
                </div>
            </div>
        </div>
    );
};

export default ChannelHead;