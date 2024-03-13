import React, {createContext, useContext, useEffect, useState} from 'react';
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
import {useNavigate, useParams} from 'react-router-dom';
import {AuthContext} from "../../../context";
import {jwtDecode} from "jwt-decode";


const UserPage = ({data}) => {

    const {tab } = useParams();
    const [activeTab, setActiveTab] = useState(tab || 'info');
    const {isAuth} = useContext(AuthContext);
    const [usernameFromToken, setUsernameFromToken] = useState(null);

    const user = new UserPageDTO(data);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            const decodedToken = jwtDecode(token);
            setUsernameFromToken(decodedToken.sub);
        }

        console.log(user);
    }, []);

    useEffect(() => {
        setActiveTab(tab || 'info');
    }, [tab]);




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
                            <TabButton onClick={() => navigate(`/user/${user.username}/info`)} active={activeTab === 'info'}>Основная информация</TabButton>
                            {isAuth && usernameFromToken === user.username && <TabButton onClick={() => navigate(`/user/${user.username}/history`)} active={activeTab === 'history'}>История</TabButton>}
                            {isAuth && usernameFromToken === user.username && <TabButton onClick={() => navigate(`/user/${user.username}/views`)} active={activeTab === 'views'}>Оценки</TabButton>}
                            <TabButton onClick={() => navigate(`/user/${user.username}/playlists`)} active={activeTab === 'playlists'}>Плейлисты</TabButton>
                            <TabButton onClick={() => navigate(`/user/${user.username}/subscriptions`)} active={activeTab === 'subscriptions'}>Подписки</TabButton>
                            <TabButton onClick={() => navigate(`/user/${user.username}/channels`)} active={activeTab === 'channels'}>Каналы</TabButton>
                        </div>
                    </div>
                    <div className={styles.userPayload}>
                        {activeTab === 'info' && <UserInfo/>}
                        {activeTab === 'history' && isAuth && usernameFromToken === user.username && <UserHistory/>}
                        {activeTab === 'views' && isAuth && usernameFromToken === user.username && <UserViews/>}
                        {activeTab === 'playlists' && <UserPlaylists/>}
                        {activeTab === 'subscriptions' && <UserSubscriptions/>}
                        {activeTab === 'channels' && <UserChannels username={user.username}/>}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserPage;