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

    async getAuth(username, password) {
        return this.post('http://localhost:8080/authenticate', { username, password });
    }

    async createAuth(username, password, passwordConfirm) {
        return this.post('http://localhost:8080/registration', { username, password, passwordConfirm });
    }
}

export const apiService = new ApiService();