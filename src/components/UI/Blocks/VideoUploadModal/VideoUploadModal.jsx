import React, { useRef, useState } from 'react';
import styles from './VideoUploadModalStyle.module.css';
import {FetchService} from "../../../../services/FetchService.js";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import FileInput from "../../Atoms/FileInput/FileInput";

const VideoUploadModal = ({ isOpen, onClose }) => {
    const [fileName, setFileName] = useState('');

    const videoFileRef = useRef();
    const previewFileRef = useRef();

    const handleUpload = async () => {
        const videoFile = videoFileRef.current.files[0];
        const previewFile = previewFileRef.current.files[0];

        const videoKey = `video/${fileName}`;
        const previewKey = `preview/${fileName}-preview`;

        // const videoResponse = await FetchService.post(`https://storage.yandexcloud.net/oculuz-media-storage/${videoKey}`, videoFile);
        // console.log(videoResponse.status, videoResponse.statusText, await videoResponse.text());

        const previewResponse = await FetchService.post(`https://storage.yandexcloud.net/oculuz-media-storage/${previewKey}`, previewFile);
        console.log(previewResponse.status, previewResponse.statusText, await previewResponse.text());

        onClose();
    };

    return (
        <div className={`${styles.modalBody} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <FileInput type="file" ref={videoFileRef} /><br />
                <Input type="text" value={fileName} onChange={e => setFileName(e.target.value)} placeholder="Введите имя файла" /><br />
                <FileInput type="file" ref={previewFileRef} /><br />
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleUpload}>Загрузить видео</Button>
            </div>
        </div>
    );
};

export default VideoUploadModal;