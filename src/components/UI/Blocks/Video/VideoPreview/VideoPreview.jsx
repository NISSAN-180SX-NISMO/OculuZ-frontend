import React from 'react';
import styles from './VideoPreview.module.css';
import {formatDistance, parseISO, differenceInDays, differenceInHours, differenceInMinutes} from 'date-fns';
import {ru} from 'date-fns/locale';

const formatPublicationDate = (uploadDate) => {
    const now = new Date();
    const uploadedDate = parseISO(uploadDate);
    const daysDiff = differenceInDays(now, uploadedDate);
    const hoursDiff = differenceInHours(now, uploadedDate);
    const minutesDiff = differenceInMinutes(now, uploadedDate);

    if (daysDiff < 1) {
        // Если с момента публикации прошло менее суток
        return `${hoursDiff} часов ${minutesDiff % 60} минут`;
    } else if (daysDiff < 3) {
        // Если с момента публикации прошло менее 3 дней
        return `${hoursDiff} часов`;
    } else {
        // Для периодов более трёх дней
        return formatDistance(uploadedDate, now, {addSuffix: true, locale: ru});
    }
};

const formatVideoDuration = (durationStr) => {
    const parts = durationStr.split(':').map(part => parseInt(part, 10));
    const hours = parts[0];
    const minutes = parts[1];
    const seconds = parts[2];

    let formattedDuration = [];
    if (hours > 0) {
        formattedDuration.push(`${hours} ч.`);
    }
    if (minutes > 0 || hours > 0) { // Если есть часы, всегда показываем минуты
        formattedDuration.push(`${minutes} мин.`);
    }
    if (seconds > 0 || (!hours && !minutes)) { // Если есть секунды или если нет ни часов, ни минут
        formattedDuration.push(`${seconds} сек.`);
    }

    return formattedDuration.join(' ');
};



const VideoPreview = ({videoData}) => {
    return (
        <div className={styles.videoPreviewBody}>
            <div className={styles.preview}>
                <img src={videoData.previewUrl} alt="Video thumbnail" className={styles.thumbnailImage}/>
                <div className={styles.videoDuration}>{formatVideoDuration(videoData.duration)}</div>
            </div>
            <div className={styles.videoInfo}>
                <div className={styles.videoTitleBody}>
                    <div className={styles.videoTitle}>{videoData.title}</div>
                </div>
                <div className={styles.channelInfo}>
                    <img src={videoData.channelAvatarUrl} alt="Channel avatar" className={styles.channelAvatar}/>
                    <span className={styles.videoStatsBody}>
                        <div className={styles.channelName}>{videoData.channelName}</div>
                        <div className={styles.videoStats}>{videoData.views} просмотров</div>
                        <div className={styles.videoStats}>{formatPublicationDate(videoData.uploadDate)} назад</div>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VideoPreview;