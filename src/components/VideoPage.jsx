import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/VideoPage.css';

const VideoPage = ({ videoUrl }) => {
    const { videoURL } = useParams();
    const decodedURL = decodeURIComponent(videoURL);
    return (
        <div style={{ display: 'flex' }}>
            <div style={{flex: '70%'}}>
                <video controls src={decodedURL} width="1280" height="720"/>
                <div сlassName={'videoData'} style={{height: '200px'}}>

                </div>
                <div style={{height: '200px', backgroundColor: 'grey'}}>
                    {/* Здесь будет блок комментариев */}
                </div>
            </div>
            <div style={{flex: '30%', backgroundColor: 'lightgrey', height: '100vh'}}>
                {/* Здесь будет список видео */}
            </div>
        </div>
    );
};

export default VideoPage;