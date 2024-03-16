import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import VideoPreview from '../VideoPreview/VideoPreview';
import {VideoPageDTO, VideoPreviewDTO} from '../../../../../model/VideoDTO.tsx';
import VideoService from '../../../../../services/VideoService';

interface ClickableVideoPreviewProps {
    video: VideoPreviewDTO;
};

const VideoPreviewWrapper: React.FC<ClickableVideoPreviewProps> = ({video}) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        navigate(`/video/${video.id}`);
    };

    return (
        <div onClick={handleClick}>
            <VideoPreview video={video}/>
        </div>
    );
};

export default VideoPreviewWrapper;