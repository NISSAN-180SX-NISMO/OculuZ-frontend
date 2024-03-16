import {FetchService} from "./FetchService";

export class VideoService {
    static async getVideoPage(videoId) {
        console.log("Улетел запроскинс");
        return FetchService.get(`http://localhost:8080/video/${videoId}`);
    }

    static async getAll() {
        return FetchService.get('http://localhost:8080/video');
    }
}