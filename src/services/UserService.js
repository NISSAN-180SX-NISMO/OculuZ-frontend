import {FetchService} from "./FetchService";
import {CreateChannelRequest} from "../model/ChannelDTO.tsx";
import {AuthService} from "./AuthService";

export class UserService {
    static async getUserPage(username) {
        return FetchService.get(`http://localhost:8080/user/${username}`);
    }

    static async createChannel(createChannelRequest: CreateChannelRequest){
        if (localStorage.getItem("isAuth") === "true") {
            const username = localStorage.getItem("username");

            return await AuthService.authPostWithRefresh(`http://localhost:8080/user/${username}/create-channel`, createChannelRequest).then(response => {
                    if (response.statuc === 409)
                        throw new Error("Channel already exists");
                    return response;
            });
        }
    }
}