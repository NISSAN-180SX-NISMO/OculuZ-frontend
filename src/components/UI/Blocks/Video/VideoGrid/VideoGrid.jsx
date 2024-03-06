import React from 'react';
import styles from './VideoGrid.module.css';
import VideoPreview from "../VideoPreview/VideoPreview";
import {VideoPreviewDTO} from "../../../../../model/VideoDTO.tsx";

interface VideoGridProps {
    videos: VideoPreviewDTO[];
};


const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
    return (
        <div className={styles.gridContainer}>
            {videos.map((video) => (
                <VideoPreview  key={video.id} video={video} />
            ))}
        </div>
    );
};

export default VideoGrid;
