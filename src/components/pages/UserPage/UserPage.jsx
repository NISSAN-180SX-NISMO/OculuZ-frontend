import React, {useEffect, useState} from 'react';
import {apiService} from '../../../services/apiService';
import {UserPageDTO} from '../../../model/UserDTO.tsx';
import UserHead from './UserHead/UserHead';
import styles from "./UserPageStyle.module.css";
import Navbar from "../../UI/Blocks/Navbar/Navbar";
import Header from "../../UI/Blocks/Header/Header";
import MainStyles from "../MainPage/MainPageStyle.module.css";
import TabButton from "../../UI/Atoms/TabButton/TabButton";
import UserInfo from "./UserInfo/UserInfo";
import UserHistory from "./UserHistory/UserHistory";
import UserViews from "./UserViews/UserViews";
import UserPlaylists from "./UserPlaylists/UserPlaylists";
import UserSubscriptions from "./UserSubscriptions/UserSubscriptions";
import UserChannels from "./UserChannels/UserChannels";
import { useParams } from 'react-router-dom';


const UserPage: React.FC = () => {
    const [user, setUser] = useState(new UserPageDTO({}));
    const {tab } = useParams();
    const [activeTab, setActiveTab] = useState(tab || 'info');

    useEffect(() => {
        setActiveTab(tab || 'info');
    }, [tab]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await apiService.getCurrentUser();
            const data = await response.json();
            setUser(new UserPageDTO(data));
        };

        fetchUser();
    }, []);

    useEffect(() => {
        console.log(user);          // todo remove
    }, [user]);

    return (
        <div>
            <Header/>
            <div className={MainStyles.mainPageBody}>
                <Navbar className={MainStyles.navbar}/>
                <div className={MainStyles.mainPagePayload}>
                    <div className={styles.headerAndTabBar}>
                        <UserHead
                            avatarUrl={user.avatarUrl}
                            registDate={user.registDate}
                            username={user.username}
                        />
                        <div className={styles.tabBar}>
                            <TabButton onClick={() => setActiveTab('info')} active={activeTab === 'info'}>Основная
                                информация</TabButton>
                            <TabButton onClick={() => setActiveTab('history')} active={activeTab === 'history'}>История</TabButton>
                            <TabButton onClick={() => setActiveTab('views')} active={activeTab === 'views'}>Оценки</TabButton>
                            <TabButton onClick={() => setActiveTab('playlists')} active={activeTab === 'playlists'}>Плейлисты</TabButton>
                            <TabButton onClick={() => setActiveTab('subscriptions')} active={activeTab === 'subscriptions'}>Подписки</TabButton>
                            <TabButton onClick={() => setActiveTab('channels')} active={activeTab === 'channels'}>Каналы</TabButton>
                        </div>
                    </div>
                    <div className={styles.userPayload}>
                        {activeTab === 'info' && <UserInfo/>}
                        {activeTab === 'history' && <UserHistory/>}
                        {activeTab === 'views' && <UserViews/>}
                        {activeTab === 'playlists' && <UserPlaylists/>}
                        {activeTab === 'subscriptions' && <UserSubscriptions/>}
                        {activeTab === 'channels' && <UserChannels/>}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserPage;