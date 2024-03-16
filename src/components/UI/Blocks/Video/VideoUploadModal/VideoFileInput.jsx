import React, { useRef } from 'react';
import FileInput from "../../../Atoms/FileInput/FileInput";

const VideoFileInput = ({ setFileName, setDuration, onParentClick }) => {

    const checkFile = (file) => {
        if (file) {
            // Проверяем, является ли файл видео
            if (!file.type.startsWith('video/')) {
                return 'Файл должен быть видео!';
            }
        }

        return null;
    };

    const handleVideoFileChange = (e) => {
        if (e.target.files[0]) {
            const videoFile = e.target.files[0];
            setFileName(videoFile.name);

            // Создаем временный URL для файла
            const videoUrl = URL.createObjectURL(videoFile);

            // Создаем невидимый элемент <video> для загрузки видео
            const videoElement = document.createElement("video");
            videoElement.src = videoUrl;

            videoElement.addEventListener("loadedmetadata", () => {

                setDuration(videoElement.duration);

                // Освобождаем созданный URL объекта
                URL.revokeObjectURL(videoUrl);
            });
        } else {
            // Если файл не выбран, устанавливаем fileName и duration в null
            setFileName("");
            setDuration(0);
        }
        if (onParentClick) {
            onParentClick(e);
        }
    };


    return (
        <FileInput onChange={handleVideoFileChange} checkFile={checkFile}>
            Выберите видео
        </FileInput>
    );
};

export default VideoFileInput;