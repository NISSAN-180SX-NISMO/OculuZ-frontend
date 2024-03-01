import React from 'react';
import VideoPreview from './VideoPreview';
import '../styles/VideoList.css';

const VideoList = ({ videos }) => {
    return (
        <div className="video-list-container">
            {videos.map((video, index) => (
                <VideoPreview key={index} {...video} />
            ))}
        </div>
    );
};

export default VideoList;