import React, { useRef } from 'react';
import FileInput from "../../../Atoms/FileInput/FileInput";
import formatDuration from "../../../../../utils/formatDuration";

const VideoFileInput = ({ setFileName, setDuration }) => {
    const videoFileRef = useRef();

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
    };


    return (
        <FileInput type="file" ref={videoFileRef} onChange={handleVideoFileChange}>
            Выберите видео
        </FileInput>
    );
};

export default VideoFileInput;