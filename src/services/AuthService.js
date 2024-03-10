import {FetchService} from './FetchService';
import {JwtResponse, LoginRequest, SignupRequest, TokenRefreshRequest} from "../model/AuthDTO.tsx";


export class AuthService {
    static async signup(signupRequest: SignupRequest) {
        return await FetchService.post('http://localhost:8080/auth/signup', signupRequest);
    }

    static async signin(loginRequest: LoginRequest) {
        console.log("loginRequest: " + loginRequest);
        const response = await FetchService.post('http://localhost:8080/auth/signin', loginRequest);

        if (response.status !== 200) {
            const error = await response.json();
            throw new Error(error.message);
        }


            const data = await response.json();
        let responseData = new JwtResponse(data);
        console.log("save in locale storage from func:signin - " + responseData.toString());

        // выведи весь локал сторадж
        for (let i = 0; i < localStorage.length; i++) {
            console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
        }

    }

    static async tryRefresh(refreshToken: TokenRefreshRequest) {
        return await FetchService.post('http://localhost:8080/auth/refresh', {
            refreshToken
        });
    }


    static async authPostWithRefresh(url, body = {}, headers = {}, queryParams = {}, uriParams = {}) {
        const authToken = localStorage.getItem('authToken');
        let response;

        if (authToken) {
            response = await FetchService.authPost(url, body, headers, queryParams, uriParams);
            if (response.status === 403) {
                const refreshResponse = await this.tryRefresh(localStorage.getItem('refreshToken'));
                if (refreshResponse.status === 200) {
                    response = await FetchService.authPost(url, body, headers, queryParams, uriParams);
                } else if (refreshResponse.status === 403) {
                    window.location.href = `/login?redirect=${window.location.pathname}`;
                }
            }
        } else {
            response = await FetchService.post(url, body, headers, queryParams, uriParams);
        }

        return response;
    }

    static async authGetWithRefresh(url, headers = {}, queryParams = {}, uriParams = {}) {
        const authToken = localStorage.getItem('authToken');
        let response;

        if (authToken) {
            response = await FetchService.authGet(url, headers, queryParams, uriParams);
            if (response.status === 403) {
                const refreshResponse = await this.tryRefresh(localStorage.getItem('refreshToken'));
                if (refreshResponse.status === 200) {
                    response = await FetchService.authGet(url, headers, queryParams, uriParams);
                } else if (refreshResponse.status === 403) {
                    window.location.href = `/login?redirect=${window.location.pathname}`;
                }
            }
        } else {
            response = await FetchService.get(url, headers, queryParams, uriParams);
        }

        return response;
    }

    static async signout() {
        const response = await FetchService.authPost('http://localhost:8080/auth/signout');
        console.log("signout status - " + response.status);
        localStorage.clear();

    }

}