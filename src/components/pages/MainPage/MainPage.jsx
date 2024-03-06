import React, { useState, useEffect } from 'react';
import Header from "../../UI/Blocks/Header/Header";
import styles from './MainPageStyle.module.css';
import Navbar from "../../UI/Blocks/Navbar/Navbar";
import VideoGrid from "../../UI/Blocks/Video/VideoGrid/VideoGrid";

const MainPage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Замените 'videos.json' на актуальный путь к вашему файлу
        const fetchVideos = async () => {
            try {
                const response = await fetch('./requests/videos.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setVideos(data);
                console.log(videos)
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
