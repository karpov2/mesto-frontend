class Api {
    constructor(config) {
        this.url = config.url;
        this.group = config.group;
        this.method = config.method;
        this.headers = config.headers;
    }

    // Подключение к серверу
    fetch(params) {
        const _url = params.url;
        const _method = params.method;
        const _body = params.body;
        const _id = params._id;

        return fetch(`${this.url}/${this.group}/${_url}/${_id || ''}`, {
            method: _method,
            headers: {
                authorization: this.headers.token,
                'Content-Type': this.headers.type,
            },
            body: JSON.stringify(_body)
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }

            // если ошибка, переходим в catch
            return Promise.reject(res.status, res.statusText);
        });
    }

    // Загрузка первоначальных карточек с сервера
    getCards() {
        return this.fetch({
            url: 'cards', 
            method: this.method.get
        });
    }

    // Добавление новой карточки
    postCards(body) {
        return this.fetch({
            url: 'cards', 
            method: this.method.post, 
            body: body
        });
    }

    // Загрузка информации о пользователе с сервера
    getUser() {
        return this.fetch({
            url: 'users/me', 
            method: this.method.get
        });
    }

    // Редактирование профиля
    patchUser(body) {
        return this.fetch({
            url: 'users/me', 
            method: this.method.patch, 
            body: body
        });
    }

    // Удаление карточки
    deleteCards(id) {
        return this.fetch({
            url: 'cards', 
            method: this.method.delete, 
            _id: id
        });
    }

    // Постановка и снятие лайка
    likeCards(method, id) {
        return this.fetch({
            url: 'cards/like', 
            method: this.method[method], 
            _id: id
        });
    }
}