export class LoginRequest {
    constructor(data: Partial<LoginRequest>) {
        Object.assign(this, data);
    }
    username: string;
    password: string;
}
export class SignupRequest {
    constructor(data: Partial<SignupRequest>) {
        Object.assign(this, data);
    }
    username: string;
    email: string;
    role: string[];
    password: string;
}

export class TokenRefreshRequest {
    constructor(data: Partial<TokenRefreshRequest>) {
        Object.assign(this, data);
    }
    refreshToken: string;
}


export class TokenRefreshResponse {
    constructor(data: Partial<TokenRefreshResponse>) {
        Object.assign(this, data);
        for (let key in data) {
            localStorage.setItem(key, data[key]);
        }
    }
    accessToken: string;
    refreshToken: string;
    tokenType: string = "Bearer";
}

export class MessageResponse {
    constructor(data: Partial<MessageResponse>) {
        Object.assign(this, data);
    }
    message: string;
}

export class JwtResponse {
    constructor(data: Partial<JwtResponse>) {
        Object.assign(this, data);
        for (let key in data) {
            localStorage.setItem(key, data[key]);
        }
    }
    authToken: string;
    type: string = "Bearer";
    refreshToken: string;
    id: number;
    username: string;
    email: string;
    roles: string[];
}