class ChannelPageDTO {
    name: string;
    registDate: Date;
    description: string;
    avatarUrl: string;
    headerUrl: string;
    authorUsername: string;
    authorAvatarUrl: string;
    subscribersCount: number;
    videosCount: number;
    isSubscribed: boolean;

    constructor(data: Partial<ChannelPageDTO>) {
        Object.assign(this, data);
    }
}


class CreateChannelRequest {
    channelName: string;
    constructor(data: Partial<ChannelPageDTO>) {
        Object.assign(this, data);
    }
}

class ChannelMiniatureDTO {
    name: string;
    avatarUrl: string;
    subscribersCount: number;


    constructor(data: Partial<ChannelMiniatureDTO>) {
        Object.assign(this, data);
    }

}

export { ChannelPageDTO, CreateChannelRequest, ChannelMiniatureDTO };