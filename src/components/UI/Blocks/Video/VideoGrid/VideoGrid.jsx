import React from 'react';
import styles from './VideoGrid.module.css';
import VideoPreview from "../VideoPreview/VideoPreview";
import {VideoPreviewDTO} from "../../../../../model/VideoDTO.tsx";
import "./BackLightStyle.css"
import VideoPreviewWrapper from "../VideoPreview/VideoPreviewWrapper";

interface VideoGridProps {
    videos: VideoPreviewDTO[];
};


const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
    return (
        <div id={"gridContainer"} className={styles.gridContainer}>
            {videos.map((video) => (
                <VideoPreviewWrapper  key={video.id} video={video} />
            ))}
        </div>
    );
};

export default VideoGrid;
