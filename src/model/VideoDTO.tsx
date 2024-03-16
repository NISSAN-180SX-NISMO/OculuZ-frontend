import {Commentary} from "./CommentDTO";

class VideoPage {
    constructor(
        public id: number,
        public channelId: number,
        public url: string,
        public previewUrl: string,
        public channelAvatarUrl: string,
        public title: string,
        public channelName: string,
        public description: string,
        public duration: number,
        public uploadDate: Date,
        public editDate: Date,
        public monetized: boolean,
        public adultContent: boolean,
        public banned: boolean,
        public views: number,
        public likes: number,
        public dislikes: number,
        public commentBranchId: number
    ) {}

    update(data: Partial<VideoPage>) {
        Object.assign(this, data);
    }
}

class VideoPreviewDTO {
    constructor(data: Partial<VideoPreviewDTO>) {
        if (data && data.uploadDate) {
            data.uploadDate = new Date(data.uploadDate);
        }
        Object.assign(this, data);
    }
    public id: string = "";
    public previewUrl: string = "";
    public channelAvatarUrl: string = "";
    public url: string = "";
    public title: string = "";
    public channelName: string = "";
    public duration: number = 0;
    public uploadDate: Date = new Date();
    public views: number = 0;
}

class NewVideoDTO {
    title: string;
    url: string;
    description: string; //
    duration: Date;
    previewUrl: string;
    uploadDate: Date;
    adultContent: boolean; //
    channelName: string;

    constructor(data: Partial<NewVideoDTO>) {
        if (data && data.uploadDate) {
            data.uploadDate = new Date(data.uploadDate);
        }
        Object.assign(this, data);
    }
}

export { VideoPage, VideoPreviewDTO, NewVideoDTO };