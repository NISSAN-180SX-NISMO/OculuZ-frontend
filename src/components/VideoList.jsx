import React, { useEffect, useState } from 'react';
import VideoPreview from './VideoPreview';
import '../styles/VideoList.css';

const VideoList = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/getVideos') // замените на ваш URL
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="video-list-container">
            {videos.map((video, index) => (
                <VideoPreview  {...video} />
            ))}
        </div>
    )
};

export default VideoList;