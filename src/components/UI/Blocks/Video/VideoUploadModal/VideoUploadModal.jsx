import React, {useEffect, useRef, useState} from 'react';
import styles from './VideoUploadModalStyle.module.css';
import Input from "../../../Atoms/Input/Input";
import Button from "../../../Atoms/Button/Button";
import VideoPreview from "../VideoPreview/VideoPreview";
import TextArea from "../../../Atoms/TextArea/TextArea";
import VideoFileInput from "./VideoFileInput";
import PreviewFileInput from "./PreviewFileInput";
import ChannelSelect from "./ChannelSelect";
import {NewVideoDTO, VideoPreviewDTO} from "../../../../../model/VideoDTO.tsx";
import {AuthService} from "../../../../../services/AuthService";
import FileUploadService from "../../../../../services/FileUploadService";

const VideoUploadModal = ({isOpen, onClose}) => {
    const [fileName, setFileName] = useState('');
    const [duration, setDuration] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [channelName, setChannelName] = useState('');
    const [channelAvatarUrl, setChannelAvatarUrl] = useState('');
    const [description, setDescription] = useState('');
    const [videoMiniaturePreview: VideoPreviewDTO, setVideoMiniaturePreview] = useState( new VideoPreviewDTO());

    const [previewFile, setPreviewFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    const handlePreviewFileChange = (e) => {
        setPreviewFile(e.target.files[0]);
    };

    const handleVideoFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    };


    useEffect(() => {
        console.log("video: " + videoFile);
        console.log("preview: " + previewFile);
        setVideoMiniaturePreview(prevState => ({
            ...prevState,
            title: fileName === '' ? 'Название видео' : fileName,
            channelName: channelName === '' ? 'Название канала' : channelName,
            channelAvatarUrl: channelAvatarUrl,
            previewUrl: previewUrl === '' ? '' : previewUrl,
            duration: !duration ? 0 : duration,
        }));
    }, [fileName, channelName, channelAvatarUrl, previewUrl, duration]);




    const handleUpload = async () => {
        const upload = new FileUploadService();
        try {
            const videoUrl = await upload.uploadPreviewToS3(previewFile);
            const previewUrl = await upload.uploadVideoToS3(videoFile);
            await upload.uploadVideoToServer(new NewVideoDTO({
                title: fileName,
                url: videoUrl,
                description: description,
                duration: duration,
                previewUrl: previewUrl,
                uploadDate: new Date(),
                adultContent: false,
                channelName: channelName,
            }))

        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div className={`${styles.modalBody} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.videoUploadBody}>
                    <div className={styles.videoPrewiew}>
                        {/*<VideoPreview video=/!*функция возвращающая VideoPreviewDTO*!//>*/}
                        <VideoPreview video={videoMiniaturePreview}/>
                        <div className={styles.solutionButtonGroup}>
                            <Button onClick={onClose}>Отмена</Button>
                            <Button onClick={handleUpload}>Загрузить видео</Button>
                        </div>
                    </div>
                    <div className={styles.videoUploadModule}>
                        <PreviewFileInput setPreviewUrl={setPreviewUrl}  onParentClick={handlePreviewFileChange}/>
                        <VideoFileInput setDuration={setDuration} setFileName={setFileName} onParentClick={handleVideoFileChange}/>
                        <Input
                            placeholder={"Введите название видео"}
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                        <ChannelSelect setChannelName={setChannelName} setChannelAvatarUrl={setChannelAvatarUrl}/>
                        <TextArea
                            placeholder={"Описание видео"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoUploadModal;