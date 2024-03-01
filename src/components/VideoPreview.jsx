import React from 'react';
import '../styles/VideoPreview.css'; // Импортируйте CSS файл

function VideoPreview({ previewUrl, avatarUrl, title, channelName, publishTime, duration }) {
    return (
        <div className="video-preview-container">
            <img className="video-preview-thumbnail" src={previewUrl} alt="Video Preview" />
            <div className="video-preview-info">
                <div className="video-preview-metadata">
                    <img className="video-preview-avatar" src={avatarUrl} alt="Channel Avatar" />
                    <div className="video-preview-text">
                        <h3 className="video-preview-title">{title}</h3>
                        <p className="video-preview-channel">{channelName}</p>
                        <p className="video-preview-publish-time">{publishTime}</p>
                    </div>
                </div>
                <div className="video-preview-duration">{duration}</div>
            </div>
        </div>
    );
}

export default VideoPreview;