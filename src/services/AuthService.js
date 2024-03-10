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
            throw new Error(response.json().message);
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


    static async authPostWithRefresh(url, body = {}, options = {}) {
        const authToken = localStorage.getItem('authToken');
        let response;

        if (authToken) {
            response = await FetchService.authPost(url, body, options);
        } else {
            response = await FetchService.post(url, body, options);
        }

        if (response.status === 403) {
            const refreshResponse = await this.tryRefresh(localStorage.getItem('refreshToken'));
            if (refreshResponse.status === 200) {
                response = await FetchService.authPost(url, body, options);
            } else if (refreshResponse.status === 403) {
                // Сохраните текущий путь перед редиректом
                const currentPath = window.location.pathname;
                // Перенаправление на форму авторизации с передачей текущего пути в параметрах
                window.location.href = `/login?redirect=${currentPath}`;
            }
        }

        return response;
    }

    static async signout() {
        const response = await FetchService.authPost('http://localhost:8080/auth/signout');
        console.log("signout response: " + response.status);

        if (response.status === 200) {
            console.log("signout ok - " + response.status);
            localStorage.clear();
        } else {
            console.log("signout not ok - " + response.status);
            throw new Error('Failed to sign out');
        }
    }

}