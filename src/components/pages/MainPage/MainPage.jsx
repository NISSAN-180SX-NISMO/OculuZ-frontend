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


    let test1 = async () => {
        console.log('test1');
        localStorage.removeItem('accessToken');
        // выведи все данные из локл сторадж
        console.log(localStorage);
    }

    let test2 = async () => {
        console.log('test2:');
        try {
            await FetchService.post('http://localhost:8080/test/test', {test: 'test', biba: 'boba'}).then(
                response => {
                    return response.text();  // Измените response.json() на response.text()
                }
            ).then(data => {
                console.log(data);  // Выводим полученные данные в консоль
            });
        } catch (e) {
            console.log(e);
        }

        try {
            await FetchService.authPost('http://localhost:8080/test/test', {test: 'test', biba: 'boba'}).then(
                response => {
                    return response.text();  // Измените response.json() на response.text()
                }
            ).then(data => {
                console.log(data);  // Выводим полученные данные в консоль
            });
        } catch (e) {
            console.log(e);
        }
    }

    let test3 = async () => {
        console.log('test3');
        try {
            await AuthService.tryRefresh(localStorage.getItem('refreshToken'));
        } catch (e) {
            console.log(e);
        }
    }


    const navigate = useNavigate(); // Используйте хук useNavigate для перенаправления
    let test4 = async () => {
        console.log('test4');

        const testEndpoint = 'http://localhost:8080/test/test';
        const testData = {test: 'test', biba: 'boba'};

        const authToken = localStorage.getItem('authToken');

        try {
            let response;
            if (authToken) {
                response = await FetchService.authPost(testEndpoint, testData);
            } else {
                response = await FetchService.post(testEndpoint, testData);
            }

            if (response.status === 200) {
                const data = await response.text();
                console.log(data);
            } else if (response.status === 403) {
                const refreshResponse = await AuthService.tryRefresh(localStorage.getItem('refreshToken'));
                if (refreshResponse.status === 200) {
                    const newAuthData = await response.json();
                    let responseData = new TokenRefreshResponse(newAuthData);
                    console.log(responseData);
                    response = await FetchService.authPost(testEndpoint, testData);
                    const data = await response.text();
                    console.log(data);
                } else if (refreshResponse.status === 403) {
                    // Сохраните текущий путь перед редиректом
                    const currentPath = window.location.pathname;
                    // Перенаправление на форму авторизации с передачей текущего пути в параметрах
                    navigate(`/login?redirect=${currentPath}`);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div>
            <Header/>
            <div className={styles.mainPageBody}>
                <Navbar className={styles.navbar}/>
                <div className={styles.mainPagePayload}>
                    {/*<VideoGrid videos={videos}/>*/}
                    <Button onClick={test1}>test 1</Button>
                    <Button onClick={test2}>test 2</Button>
                    <Button onClick={test3}>test 3</Button>
                    <Button onClick={test4}>test 4</Button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
