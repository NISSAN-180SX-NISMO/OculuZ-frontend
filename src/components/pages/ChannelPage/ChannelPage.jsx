import React, {useContext, useEffect, useState} from 'react';
import Header from "../../UI/Blocks/Header/Header";
import MainStyles from "../MainPage/MainPageStyle.module.css";
import Navbar from "../../UI/Blocks/Navbar/Navbar";
import styles from "./ChannelPageStyle.module.css";
import TabButton from "../../UI/Atoms/TabButton/TabButton";
import {ChannelPageDTO} from "../../../model/ChannelDTO.tsx";
import {jwtDecode} from "jwt-decode";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../../context";
import ChannelInfo from "./ChannelInfo/ChannelInfo";
import ChannelVideoList from "./ChannelVideoList/ChannelVideoList";
import ChannelPlaylists from "./ChannelPlaylists/ChannelPlaylists";
import ChannelHead from "./ChannelHead/ChannelHead";

const ChannelPage = ({data}) => {
    const channel = new ChannelPageDTO(data);
    const {tab } = useParams();
    const [activeTab, setActiveTab] = useState(tab || 'info');
    const {isAuth} = useContext(AuthContext);
    const [usernameFromToken, setUsernameFromToken] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsernameFromToken(decodedToken.username);
        }
        console.log('channel', channel);
    }, []);

    useEffect(() => {
        setActiveTab(tab || 'videos');
    }, [tab]);

    return (
        <div>
            <div>
                <Header/>
                <div className={MainStyles.mainPageBody}>
                    <Navbar className={MainStyles.navbar}/>
                    <div className={MainStyles.mainPagePayload}>
                        <div className={styles.headerAndTabBar}>
                            <ChannelHead
                                avatarUrl={channel.avatarUrl}
                                headerUrl={channel.headerUrl}
                                registDate={channel.registDate}
                                username={usernameFromToken}
                                channelName={channel.name}
                                videosCount={channel.videosCount}
                                subscribersCount={channel.subscribersCount}
                                isSubscribed={channel.isSubscribed}
                            />
                            <div className={styles.tabBar}>
                                <TabButton onClick={() => navigate(`/channel/${channel.name}/videos`)}
                                           active={activeTab === 'videos'}>Главная</TabButton>

                                <TabButton onClick={() => navigate(`/channel/${channel.name}/playlists`)}
                                           active={activeTab === 'playlists'}>Плейлисты</TabButton>

                                <TabButton onClick={() => navigate(`/channel/${channel.name}/info`)}
                                           active={activeTab === 'info'}>Информация</TabButton>
                            </div>
                        </div>
                        <div className={styles.channelPayload}>
                            {activeTab === 'videos' && <ChannelVideoList/>}
                            {activeTab === 'playlists' && <ChannelPlaylists/>}
                            {activeTab === 'info' && <ChannelInfo/>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChannelPage;