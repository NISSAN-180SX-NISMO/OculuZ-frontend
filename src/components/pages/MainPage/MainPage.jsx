import React, {useState, useEffect} from 'react';
import Header from "../../UI/Blocks/Header/Header";
import styles from './MainPageStyle.module.css';
import Navbar from "../../UI/Blocks/Navbar/Navbar";
import VideoGrid from "../../UI/Blocks/Video/VideoGrid/VideoGrid";
import {apiService} from "../../../services/apiService";
import {VideoPreviewDTO} from "../../../model/VideoDTO.tsx";
import {Button} from "react-bootstrap";
import {AuthService} from "../../../services/AuthService";
import {FetchService} from "../../../services/FetchService";
import {useNavigate} from 'react-router-dom';
import {TokenRefreshResponse} from "../../../model/AuthDTO.tsx";

const MainPage = () => {
    const [videos: VideoPreviewDTO, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await apiService.getVideoList();
                if (!response.ok) {
                    console.error('Network response was not ok');
                }
                const data = await response.json();
                setVideos(data.map(video => new VideoPreviewDTO({...video})));
            } catch (error) {
                console.error("Ошибка при загрузке видео:", error);
            }
        };

        fetchVideos();
    }, []); // Пустой массив зависимостей, чтобы эффект выполнялся только при первом рендере



    return (
        <div>
            <Header/>
            <div className={styles.mainPageBody}>
                <Navbar className={styles.navbar}/>
                <div className={styles.mainPagePayload}>
                    <VideoGrid videos={videos}/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
