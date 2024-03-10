
class UserPageDTO {
    constructor(data: any) {
        Object.assign(this, data);
    }
    public id: number = 0;
    public username: string = '';
    public email: string = '';
    public accessPermission: string = '';
    public banned: boolean = false;
    public banEndDate: string = '';
    public birthDate: string = '';
    public registDate: string = '';
    public avatarUrl: string = '';
    public country: string = '';
    public roles: string[] = [];
}

export { UserPageDTO };