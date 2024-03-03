import React, { useEffect, useState } from 'react';
import VideoPreview from './VideoPreview';
import '../styles/VideoList.css';
import {VideoMiniature} from "../model/VideoDTO.tsx";

const VideoList = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/getVideoList') // замените на ваш URL
            .then(response => response.json())
            .then(data => {
                const videoMiniatures = data.map(video => new VideoMiniature(
                    video.id,
                    video.previewUrl,
                    video.channelAvatarUrl,
                    video.videoUrl,
                    video.title,
                    video.channelName,
                    video.duration,
                    video.uploadDate,
                    video.views
                ));
                setVideos(videoMiniatures);
            })
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