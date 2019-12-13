class Api {
    constructor(config) {
        this.url = config.url;
        this.group = config.group;
        this.method = config.method;
        this.headers = config.headers;
    }

    // Подключение к серверу
    fetch(url, method) {
        return fetch(`${this.url}/${this.group}/${url}`, {
            method: method,
            headers: {
                authorization: this.headers.token,
                'Content-Type': this.headers.type,
            }
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }

            // если ошибка, переходим в catch
            return Promise.reject(res.status, res.statusText);
        })
        .catch((status, text) => console.log(`Ошибка: ${status} - ${text}`));
    }

    // Получить карточки
    getCards() {
        return this.fetch('cards', this.method.get)
            .then(card => {
                card = card.slice(0, 10);
                console.table(card);
                return card;
            });
    }

    getUser() {
        return this.fetch('users/me', this.method.get)
            .then(user => {
                console.table(user);
                return user;
            });
    }
}