class ChannelPageDTO {
    name: string;
    registDate: Date;
    description: string;
    email: string;
    avatarUrl: string;
    headerUrl: string;
    authorUsername: string;
    authorAvatarUrl: string;
    subscribersCount: number;
    videosCount: number;

    constructor(data: Partial<ChannelPageDTO>) {
        Object.assign(this, data);
    }
}

export { ChannelPageDTO };