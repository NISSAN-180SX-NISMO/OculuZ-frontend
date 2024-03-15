import React from 'react';
import Select from "../../../Atoms/Select/Select";
import {FetchService} from "../../../../../services/FetchService.js";
import {ChannelMiniatureDTO} from "../../../../../model/ChannelDTO.tsx";
import styles from './VideoUploadModalStyle.module.css';

const ChannelSelect = ({ setChannelName, setChannelAvatarUrl }) => {
    const [channels : ChannelMiniatureDTO[], setChannels] = React.useState([]);

    React.useEffect(() => {
        FetchService.get(`http://localhost:8080/user/${localStorage.getItem("username")}/channels`)
            .then(response => response.json())
            .then(data => {
                const channelList = data.map(channel => new ChannelMiniatureDTO(channel));
                setChannels(channelList);
            })
            .catch(error => console.error(error));
    }, []);

    const handleChannelSelect = (value) => {
        const selectedChannel : ChannelMiniatureDTO = channels.find(channel => channel.name === value);
        setChannelName(value);
        setChannelAvatarUrl(selectedChannel ? selectedChannel.avatarUrl : '');
    };

    return (
        <div className={styles.channelSelect}>
            <div>Опубликовать видео на канале</div>
            <Select options={channels.map(channel => channel.name)}
                    onSelect={handleChannelSelect}/>
        </div>
    );
};

export default ChannelSelect;