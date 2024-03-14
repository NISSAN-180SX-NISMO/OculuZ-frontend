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
            body: JSON.stringify({ fileName: file.name })
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
                <FileInput type="file" ref={videoFileRef} /><br />
                {/*<Input type="text" value={fileName} onChange={e => setFileName(e.target.value)} placeholder="Введите имя файла" /><br />*/}
                {/*<FileInput type="file" ref={previewFileRef} /><br />*/}
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleUpload}>Загрузить видео</Button>
            </div>
        </div>
    );
};

export default VideoUploadModal;