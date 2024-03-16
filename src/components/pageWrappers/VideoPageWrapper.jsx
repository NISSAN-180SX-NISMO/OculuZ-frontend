import {useParams} from "react-router-dom";
import NotFoundSplitter from "../NotFoundSplitter/NotFoundSplitter";
import React from "react";
import {VideoService} from "../../services/VideoService";
import VideoPage from "../pages/VideoPage/VideoPage";

const VideoPageWrapper = () => {
    const { videoId } = useParams();

    return (
        <NotFoundSplitter
            apiMethod={() => VideoService.getVideoPage(videoId)}
            Component={VideoPage}
        />
    );
};

export default VideoPageWrapper;