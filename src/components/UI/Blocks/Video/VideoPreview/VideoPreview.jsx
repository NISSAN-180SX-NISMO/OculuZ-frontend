import React from 'react';
import styles from './VideoPreview.module.css';
import {VideoPreviewDTO} from "../../../../../model/VideoDTO.tsx";
import Avatar from "../../../Atoms/Avatar/Avatar";
import formatDuration from "../../../../../utils/formatDuration.js";
import formatTimeSince from "../../../../../utils/formatTimeSince.js";

interface VideoPreviewProps {
    video: VideoPreviewDTO;
};

const VideoPreview : React.FC<VideoPreviewProps> = ({video}) => {
    return (
        <div className={styles.backlight}>
            <div className={styles.videoPreviewBody}>
                <div className={styles.preview}>
                    <picture>
                        <source srcSet={video.previewUrl}/>
                        <img
                            className={styles.thumbnailImage}
                            src={"/public/resources/defaultPreview.jpeg"}
                        />
                    </picture>
                    <div className={styles.videoDuration}>{formatDuration(video.duration)}</div>
                </div>
                <div className={styles.videoInfo}>
                    <div className={styles.videoTitleBody}>
                        <div className={styles.videoTitle}>{video.title}</div>
                    </div>
                    <div className={styles.channelInfo}>
                        <div className={styles.channelAvatar}>
                            <Avatar avatarUrl={video.channelAvatarUrl}/>
                        </div>

                        <span className={styles.videoStatsBody}>
                        <div className={styles.channelName}>{video.channelName}</div>
                        <div className={styles.videoStats}>{video.views} просмотров</div>
                        <div className={styles.videoStats}>{formatTimeSince(video.uploadDate)}</div>
                    </span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default VideoPreview;