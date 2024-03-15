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

    const [previewFile, setPreviewFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    const handlePreviewFileChange = (e) => {
        setPreviewFile(e.target.files[0]);
    };

    const handleVideoFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const uploadPreviewFile = async () => {
        const formData = new FormData();
        formData.append('file', previewFile);

        try {
            const response = await fetch('http://localhost:8080/preview/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.previewUrl) {
                console.log(`Preview URL: ${data.previewUrl}`);
            } else if (data.message) {
                console.log(`Error message: ${data.message}`);
            }
        } catch (error) {
            console.error(`There has been a problem with your fetch operation: ${error.message}`);
        }
    };





    const videoFileRef = useRef();





    useEffect(() => {
        console.log("duration" + duration);
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
                        <VideoPreview video={videoMiniaturePreview}/>
                        <div className={styles.solutionButtonGroup}>
                            <Button onClick={onClose}>Отмена</Button>
                            <Button onClick={uploadPreviewFile}>Загрузить видео</Button>
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
                        <TextArea placeholder={"Описание видео"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoUploadModal;