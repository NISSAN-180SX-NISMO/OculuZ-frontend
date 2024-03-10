export class FetchService {
    static async post(url, body = {}, headers = {}, queryParams = {}, uriParams = {}) {
        const queryString = new URLSearchParams(queryParams).toString();

        Object.keys(uriParams).forEach(key => {
            url = url.replace(`:${key}`, uriParams[key]);
        });

        return fetch(`${url}?${queryString}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        }).then(response => {
            const newToken = response.headers.get('Authorization');
            if (newToken) {
                localStorage.setItem('authToken', newToken);
            }
            return response;
        });
    }

    static async authPost(url, body = {}, headers = {}, queryParams = {}, uriParams = {}) {
        const token = localStorage.getItem('authToken');
        return this.post(url, body, {
            'Authorization': `Bearer ${token}`,
            ...headers
        }, queryParams, uriParams).then(response => {
            return response;
        });
    }

    static async get(url, headers = {}, queryParams = {}, uriParams = {}) {
        // Преобразование объекта queryParams в строку запроса
        const queryString = new URLSearchParams(queryParams).toString();

        // Добавление параметров URI в URL
        Object.keys(uriParams).forEach(key => {
            url = url.replace(`:${key}`, uriParams[key]);
        });
        return fetch(`${url}?${queryString}`, {
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        }).then(response => {
            const newToken = response.headers.get('Authorization');
            if (newToken) {
                localStorage.setItem('authToken', newToken);
            }
            return response;
        });
    }

    static async authGet(url, headers = {}, queryParams = {}, uriParams = {}) {
        const token = localStorage.getItem('authToken');
        return this.get(url, {
            'Authorization': `Bearer ${token}`,
            ...headers
        },queryParams, uriParams).then(response => {
            return response;
        });
    }
}