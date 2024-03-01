import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";

import LeftNavBar from "./components/LeftNavBar";
import VideoPreview from "./components/VideoPreview";
import VideoList from "./components/VideoList";

let videos = Array(50).fill({
    previewUrl: "https://imgur.com/UZJxRjX.jpg",
    avatarUrl: "https://imgur.com/UZJxRjX.jpg",
    title: "Берсерк. ОБЗОР АНИМЕ",
    channelName: "Аниме обзоры",
    publishTime: "16:34",
    duration: "24:23"
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <VideoPreview
    //     previewUrl="https://imgur.com/UZJxRjX.jpg"
    //     avatarUrl="https://imgur.com/UZJxRjX.jpg"
    //     title="Берсерк. ОБЗОР АНИМЕ"
    //     channelName="Аниме обзоры"
    //     publishTime="16:34"
    //     duration="24:23"
    // />
    <React.StrictMode>
        <Header/>
        <div className="app-container">
            <LeftNavBar/>
            <VideoList videos={videos} />
        </div>
    </React.StrictMode>
);

