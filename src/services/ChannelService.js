import {FetchService} from "./FetchService";
import {AuthService} from "./AuthService";

export class ChannelService {
    static async getChannelPage(channelName) {
        if (localStorage.getItem('isAuth') === "true")
            return FetchService.authGet(`http://localhost:8080/channel/${channelName}`);
        else
            return FetchService.get(`http://localhost:8080/channel/${channelName}`);
    }

    static async subscribe(channelName) {
        return AuthService.authPostWithRefresh(`http://localhost:8080/channel/${channelName}`, {action: "subscribe"});
    }

    static async unsubscribe(channelName) {
        return AuthService.authPostWithRefresh(`http://localhost:8080/channel/${channelName}`,{action: "unsubscribe"});
    }
}