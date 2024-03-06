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
}

class VideoPreview {
    constructor(
        public id: string,
        public previewUrl: string,
        public channelAvatarUrl: string,
        public videoUrl: string,
        public title: string,
        public channelName: string,
        public duration: number,
        public uploadDate: Date,
        public views: number
    ) {}
}

export { VideoPage, VideoPreview };