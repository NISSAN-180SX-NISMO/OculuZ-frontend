import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import VideoPage from './components/VideoPage'; // Импортируйте компонент страницы видео

import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";

import LeftNavBar from "./components/LeftNavBar";
import VideoPreview from "./components/VideoPreview";
import VideoList from "./components/VideoList";

let videos = Array(50).fill({
    previewUrl: "https://imgur.com/ajAYUT3.jpg",
    avatarUrl: "https://sun9-80.userapi.com/impg/BhSVyLt-RmReWl2LgrV7s9qHu-5wxCuv-vERtw/OkkI8TXJSCw.jpg?size=2048x2048&quality=95&sign=184e3f64972ca71247bc7997892031a8&type=album",
    title: "Разводные мосты в Санкт-Петербурге",
    channelName: "Студент ГУАПа LIVE",
    publishTime: "16:34",
    duration: "24:23",
    //videoURL: "https://i.imgur.com/VzyhsXj.mp4"
    videoURL: "https://vk.com/video_ext.php?oid=-34404956&id=456241721&hash=e2828e97d9709698"
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Routes>
                <Route path="/video/:videoURL" element={<VideoPage/>}/>
                <Route path="/" element={
                    <>
                        <Header/>
                        <div className="app-container">
                            <LeftNavBar/>
                            <VideoList videos={videos}/>
                        </div>
                    </>
                }/>
            </Routes>
        </React.StrictMode>
    </BrowserRouter>
);


