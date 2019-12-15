class Api {
    constructor(config) {
        this.url = config.url;
        this.group = config.group;
        this.method = config.method;
        this.headers = config.headers;
    }

    // Подключение к серверу
    fetch(url, method, body) {
        return fetch(`${this.url}/${this.group}/${url}`, {
            method: method,
            headers: {
                authorization: this.headers.token,
                'Content-Type': this.headers.type,
            },
            body: JSON.stringify(body)
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
        return this.fetch('cards', this.method.get)
            .then(card => {
                let data = [];
                card.filter(item => {
                    if (item.owner.name === 'Илья Карпов' ||
                        item.owner._id === '52edaf937c24d358ab22d3e0') {
                        
                        data.unshift(item);
                    }
                    if (data.length < 9) {
                        data.push(item);
                    }
                    return data;
                })

                let test = [];
                const result = card.reduce((value, item) => {
                    // console.log(item.owner.name);
                    if (!value[item.owner.name]) {
                    // если ключа ещё нет в объекте, значит это первое повторение
                        value[item.owner.name] = 1;
                    } else {
                    // иначе увеличим количество повторений на 1
                        value[item.owner.name] += 1;
                    }
                
                    // и вернём изменённый объект
                    return value;
                }, {});
                console.table(result);

                return data;
            });
    }

    // Добавление новой карточки
    postCards(body) {
        return this.fetch('cards', this.method.post, body);
    }

    // Загрузка информации о пользователе с сервера
    getUser() {
        return this.fetch('users/me', this.method.get)
            .then(user => {
                return user;
            });
    }

    // Редактирование профиля
    patchUser(body) {
        return this.fetch('users/me', this.method.patch, body);
    }
}