import React, { useEffect, useState } from 'react';
import Button from "../../../UI/Atoms/Button/Button";
import ChannelList from "../../../UI/Blocks/ChannelList/ChannelList";
import { ChannelMiniatureDTO } from "../../../../model/ChannelDTO.tsx";
import styles from './UserChannelsStyle.module.css';
import { FetchService } from '../../../../services/FetchService';

const UserChannels = ({username}) => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        FetchService.get(`http://localhost:8080/user/${username}/channels`)
            .then(response => response.json())
            .then(data => {
                const channelList = data.map(channel => new ChannelMiniatureDTO(channel));
                setChannels(channelList);
            })
            .catch(error => console.error(error));
    }, [username]);

    const addChannel = () => {
        window.location.href = `/user/${username}/create-channel`;
    }

    return (
        <div>
            <ChannelList channels={channels}/>
            <div className={styles.addChannelButton}>
                <Button onClick={addChannel}>ADD CHANNEL</Button>
            </div>
        </div>
    );
};

export default UserChannels;