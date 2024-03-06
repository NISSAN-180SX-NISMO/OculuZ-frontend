class ApiService {
    async post(url, body) {
        return (await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }));
    }

    async get(url, params = {}) {
        const query = new URLSearchParams(params).toString();
        return (await fetch(`${url}?${query}`));
    }

    async getAuth(username, password) {
        return this.post('http://localhost:8080/authenticate', { username, password });
    }

    async createAuth(username, password, passwordConfirm) {
        return this.post('http://localhost:8080/registration', { username, password, passwordConfirm });
    }

    async getVideoList(username = null) {
        const params = username ? { username } : {};
        return this.get('./requests/videos.json', params);
    }
}

export const apiService = new ApiService();
