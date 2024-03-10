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

export { ChannelPageDTO };