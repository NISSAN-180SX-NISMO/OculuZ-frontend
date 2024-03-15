import React from 'react';
import {ChannelMiniatureDTO} from "../../../../model/ChannelDTO.tsx";
import ChannelMiniature from "./ChannelMiniature/ChannelMiniature";
import styles from './ChannelListStyle.module.css';

interface ChannelListProps {
    channels: ChannelMiniatureDTO[];
};

const ChannelList : React.FC<ChannelListProps> = ({channels}) => {
    return (
        <div className={styles.listBody}>
            {channels.map((channel) => (
                <ChannelMiniature key={channel.name} channel={channel} />
            ))}
        </div>
    );
};

export default ChannelList;