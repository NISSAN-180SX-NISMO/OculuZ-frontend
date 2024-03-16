import {AuthService} from "./AuthService";
import {FetchService} from "./FetchService";
import {NewVideoDTO} from "../model/VideoDTO.tsx";
import createUniqueFileKey from "../utils/createUniqueFileKey.js";

class FileUploadService {
    #previewFile;
    #videoFile;
    #uploadId;
    #videoUrl;
    #previewUrl;

    async initUpload() {
        console.log('initUpload method called');
        console.log("testVideoHardCode.mp4");
        // console.log(this.#videoFile.name);


        const initResponse = await AuthService.authPostWithRefresh(
            'http://localhost:8080/video/init-upload',
            {fileName: createUniqueFileKey(this.#videoFile.name)}
            // {fileName: this.#videoFile.name}
        );

        const initUploadResponse = await initResponse.json();
        this.#uploadId = initUploadResponse.uploadId;
    }

    async uploadParts() {
        console.log('uploadParts method called');
        const partSize = 5 * 1024 * 1024; // 5MB
        const numParts = Math.ceil(this.#videoFile.size / partSize);

        for (let partNumber = 1; partNumber <= numParts; partNumber++) {
            const start = (partNumber - 1) * partSize;
            const end = partNumber * partSize;

            const part = this.#videoFile.slice(start, end);

            const formData = new FormData();
            formData.append('file', part);
            formData.append('partNumber', partNumber.toString());
            formData.append('uploadId', this.#uploadId);

            const response = await fetch('http://localhost:8080/video/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Upload failed for part ${partNumber}`);
            }

            const uploadResponse = await response.json();
            console.log(uploadResponse.message);
        }
    }

    async completeUpload() {
        console.log('completeUpload method called');

        const response = await FetchService.authPost(
            'http://localhost:8080/video/complete-upload',
            {},
            {},
            {uploadId: this.#uploadId});

        if (!response.ok) {
            throw new Error('Failed to complete upload');
        }

        const data = await response.json();
        this.#videoUrl = data.videoUrl; // Save videoUrl in class field
    }

    async uploadPreviewToS3(file) {
        this.#previewFile = file;
        function renameFile(file, newName) {
            return new File([file], newName, {type: file.type});
        }

        this.#previewFile = renameFile(this.#previewFile, createUniqueFileKey(this.#previewFile.name));
        console.log('uploadPreviewFile method called');
        const formData = new FormData();
        formData.append('file', this.#previewFile);
        try {
            const response = await fetch('http://localhost:8080/preview/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            this.#previewUrl = data.previewUrl; // Save previewUrl in class field
            console.log("preview url: " + this.#previewUrl);
            return this.#previewUrl;

        } catch (error) {
            throw error;
        }
    };

    async uploadVideoToS3(file) {
        this.#videoFile = file;
        console.log('uploadFiles method called');
        try {
            await this.initUpload();
            await this.uploadParts();
            await this.completeUpload();

            console.log("video url: " + this.#videoUrl);
            return this.#videoUrl;

        } catch (error) {
            throw error;
        }
    }

    async uploadVideoToServer(video: NewVideoDTO) {
        try {
            const response = await AuthService.authPostWithRefresh(`http://localhost:8080/channel/${video.channelName}/upload-video`, video);
            if (response.status === 200) {
                console.log("Видео успешно загружено");
            }
        } catch (e) {
            console.error(e);
        }
    }

    async uploadHeaderToS3(file) {
        // TODO: implement
    }
}

export default FileUploadService;