import React, {useEffect, useRef, useState} from 'react';
import styles from './VideoUploadModalStyle.module.css';
import Input from "../../../Atoms/Input/Input";
import Button from "../../../Atoms/Button/Button";
import VideoPreview from "../VideoPreview/VideoPreview";
import TextArea from "../../../Atoms/TextArea/TextArea";
import VideoFileInput from "./VideoFileInput";
import PreviewFileInput from "./PreviewFileInput";
import ChannelSelect from "./ChannelSelect";
import {VideoPreviewDTO} from "../../../../../model/VideoDTO.tsx";

const VideoUploadModal = ({isOpen, onClose}) => {
    const [fileName, setFileName] = useState('');
    const [duration, setDuration] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [channelName, setChannelName] = useState('');
    const [channelAvatarUrl, setChannelAvatarUrl] = useState('');
    const [videoMiniaturePreview: VideoPreviewDTO, setVideoMiniaturePreview] = useState( new VideoPreviewDTO());






    const videoFileRef = useRef();

    const [defaultVideo, setDefaultVideo] = useState({
        id: "",
        previewUrl: "",
        channelAvatarUrl: "",
        videoUrl: "",
        title: "Название видео",
        channelName: "Название канала",
        duration: 0,
        uploadDate: new Date(),
        views: 0
    });



    useEffect(() => {
        console.log("duration" + duration);
        setDefaultVideo(prevState => ({
            ...prevState,
            title: fileName === '' ? 'Название видео' : fileName,
            channelName: channelName === '' ? 'Название канала' : channelName,
            channelAvatarUrl: channelAvatarUrl,
            previewUrl: previewUrl === '' ? '' : previewUrl,
            duration: !duration ? 0 : duration,
        }));
    }, [fileName, channelName, channelAvatarUrl, previewUrl, duration]);

    const handleUpload = async () => {
        const file = videoFileRef.current.files[0];
        const partSize = 5 * 1024 * 1024; // 5MB
        const numParts = Math.ceil(file.size / partSize);

        const token = localStorage.getItem('authToken'); // Получаем токен из localStorage

        // Инициализация загрузки
        const initResponse = await fetch('http://localhost:8080/video/init-upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Добавляем токен в заголовки запроса
            },
            body: JSON.stringify({fileName: file.name})
        });

        if (!initResponse.ok) {
            throw new Error('Failed to initialize upload');
        }

        const initUploadResponse = await initResponse.json();
        const uploadId = initUploadResponse.uploadId;
        console.log(`Upload initiated with ID: ${uploadId}`);

        for (let partNumber = 1; partNumber <= numParts; partNumber++) {
            const start = (partNumber - 1) * partSize;
            const end = partNumber * partSize;

            const part = file.slice(start, end);

            const formData = new FormData();
            formData.append('file', part);
            formData.append('partNumber', partNumber);
            formData.append('uploadId', uploadId); // Используем идентификатор загрузки, полученный от сервера

            const response = await fetch('http://localhost:8080/video/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // Добавляем токен в заголовки запроса
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Upload failed for part ${partNumber}`);
            }

            const uploadResponse = await response.json();
            console.log(uploadResponse.message);
        }

        // После успешной загрузки всех частей файла, отправляем запрос на эндпоинт /complete-upload
        const completeResponse = await fetch(`http://localhost:8080/video/complete-upload?uploadId=${uploadId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Добавляем токен в заголовки запроса
            },
        });

        if (!completeResponse.ok) {
            throw new Error('Failed to complete upload');
        }

        const completeUploadResponse = await completeResponse.json();
        console.log("Файл доступен по ссылке https://s3.timeweb.cloud/fd22a2a2-oculuz-media-storage/" + completeUploadResponse.fileUrl);


        onClose();
    };


    return (
        <div className={`${styles.modalBody} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.videoUploadBody}>
                    <div className={styles.videoPrewiew}>
                        {/*<VideoPreview video=/!*функция возвращающая VideoPreviewDTO*!//>*/}
                        <VideoPreview video={defaultVideo}/>
                        <div className={styles.solutionButtonGroup}>
                            <Button onClick={onClose}>Отмена</Button>
                            <Button onClick={handleUpload}>Загрузить видео</Button>
                        </div>
                    </div>
                    <div className={styles.videoUploadModule}>
                        <PreviewFileInput setPreviewUrl={setPreviewUrl} />
                        <VideoFileInput setDuration={setDuration} setFileName={setFileName} />
                        <Input
                            placeholder={"Введите название видео"}
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                        <ChannelSelect setChannelName={setChannelName} setChannelAvatarUrl={setChannelAvatarUrl}/>
                        <TextArea placeholder={"Описание видео"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoUploadModal;