import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VideoPreview.css'; // Импортируйте CSS файл


function VideoPreview({ id, previewUrl, channelAvatarUrl, videoUrl, title, channelName, uploadDate, duration, videoURL }) {
    return (
        <Link to={`/video/${encodeURIComponent(videoUrl)+ ".mp4"}`}>
            <div className="video-preview-container">
                {/*<img className="video-preview-thumbnail" src={previewUrl + ".jpg"} alt="Video Preview"/>*/}
                <picture>
                    <source srcSet={previewUrl}/>
                    <img
                        className="video-preview-thumbnail"
                        src='C:/Users/User/Desktop/frontend/public/images/defaultimg.jpeg'
                    />
                </picture>
                {/*<Image src={imgSrc} alt="" role="presentation" />*/}
                <div className="video-preview-info">
                    <div className="video-preview-metadata">
                        <img className="video-preview-avatar" src={channelAvatarUrl + ".jpg"} alt="Channel Avatar"/>
                        <div className="video-preview-text">
                            <h3 className="video-preview-title">{title}</h3>
                            <p className="video-preview-channel">{channelName}</p>
                            <p className="video-preview-publish-time">Загружено {uploadDate}</p>
                        </div>
                    </div>
                    <div className="video-preview-duration">{duration}</div>
                </div>
            </div>
        </Link>
    );
}

export default VideoPreview;