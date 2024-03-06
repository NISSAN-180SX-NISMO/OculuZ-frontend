import React from 'react';
import styles from './VideoGrid.module.css';
import VideoPreview from "../VideoPreview/VideoPreview";

const VideoGrid = ({ videos }) => {
    return (
        <div className={styles.gridContainer}>
            {videos.map((video) => (
                <VideoPreview videoData={video} />
            ))}
        </div>
    );
};

export default VideoGrid;
