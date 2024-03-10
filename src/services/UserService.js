import {FetchService} from "./FetchService";

export class UserService {
    static async getUserPage(username) {
        return FetchService.get(`http://localhost:8080/user/${username}`);
    }
}