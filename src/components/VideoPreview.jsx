import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VideoPreview.css'; // Импортируйте CSS файл

function VideoPreview({ previewUrl, avatarUrl, title, channelName, publishTime, duration, videoURL }) {
    return (
        <Link to={`/video/${encodeURIComponent(videoURL)+ ".mp4"}`}>
            <div className="video-preview-container">
                {/*<img className="video-preview-thumbnail" src={previewUrl + ".jpeg"} alt="Video Preview"/>*/}
                <picture>
                    <source srcSet={previewUrl + ".jpeg"}/>
                    <img
                        className="video-preview-thumbnail"
                        src="/defaultimg.jpeg"
                    />
                </picture>
                <div className="video-preview-info">
                    <div className="video-preview-metadata">
                        <img className="video-preview-avatar" src={avatarUrl + ".jpeg"} alt="Channel Avatar"/>
                        <div className="video-preview-text">
                            <h3 className="video-preview-title">{title}</h3>
                            <p className="video-preview-channel">{channelName}</p>
                            <p className="video-preview-publish-time">{publishTime}</p>
                        </div>
                    </div>
                    <div className="video-preview-duration">{duration}</div>
                </div>
            </div>
        </Link>
    );
}

export default VideoPreview;