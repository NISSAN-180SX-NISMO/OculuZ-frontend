import React, {useEffect} from 'react';
import Header from "../../UI/Blocks/Header/Header";
import {VideoPageDTO} from "../../../model/VideoDTO.tsx";
import Input from "../../UI/Atoms/Input/Input";

const VideoPage = ({data}) => {

    useEffect(() => {
        console.log(data)
    }, []);

    const video = new VideoPageDTO(data);

    return (
        <div>
            <Header/>
            <Input type="text" value={video.id} readOnly/>
            <Input type="text" value={video.title} readOnly/>
            <Input type="text" value={video.description} readOnly/>
            <Input type="text" value={video.views} readOnly/>
            <Input type="text" value={video.likes} readOnly/>
            <Input type="text" value={video.dislikes} readOnly/>
            <Input type="text" value={video.channelName} readOnly/>
            <Input type="text" value={video.channelAvatarUrl} readOnly/>
            <Input type="text" value={video.uploadDate} readOnly/>
            <Input type="text" value={video.duration} readOnly/>
            <Input type="text" value={video.previewUrl} readOnly/>

        </div>
    );
};

export default VideoPage;