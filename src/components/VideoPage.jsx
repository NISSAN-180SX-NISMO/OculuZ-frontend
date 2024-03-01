import React from 'react';
import { useParams } from 'react-router-dom';

const VideoPage = ({ videoUrl }) => {
    const { videoURL } = useParams();
    const decodedURL = decodeURIComponent(videoURL);
    return (
        <div>
            <video controls src={decodedURL} />
        </div>
    );
};

export default VideoPage;
