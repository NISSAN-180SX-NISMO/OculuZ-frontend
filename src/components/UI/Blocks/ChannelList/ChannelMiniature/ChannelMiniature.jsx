import React from 'react';
import styles from './ChannelMiniatureStyle.module.css';
import Avatar from "../../../Atoms/Avatar/Avatar";
import ItemButton from "../../../Atoms/ItemButton/ItemButton";
import {ChannelMiniatureDTO} from "../../../../../model/ChannelDTO.tsx";

interface ChannelMiniatureProps {
    channel: ChannelMiniatureDTO;
};
const ChannelMiniature : React.FC<ChannelMiniatureProps> = ( {channel} ) => {
    return (
        <ItemButton>
            <div className={styles.itemBody}>
                <Avatar avatarUrl={channel.avatarUrl}/>
                <div className={styles.channelName}>
                    {channel.name}
                </div>
                <div className={styles.channelSubs}>
                    {channel.subscribersCount} Подписчиков
                </div>
            </div>
        </ItemButton>
    );
};

export default ChannelMiniature;