class Profile {
    constructor(profile, api, preloading) {
        // Профиль: "Имя" и "О себе"
        this.name = document.querySelector(`.${profile.name}`);
        this.about = document.querySelector(`.${profile.about}`);
        this.avatar = document.querySelector(`.${profile.avatar}`);

        this.user = api;
        this.preloading = preloading;
    }

    add(name, about, avatar) {
        this.name.textContent = name;
        this.about.textContent = about;

        if (!!avatar) {
            this.addPhoto(avatar);
        }
    }

    addPhoto(avatar) {
        this.preloading.load(this.avatar.parentNode);
        this.avatar.src = avatar;
        
        this.avatar.onload = () => {
            this.preloading.load(this.avatar.parentNode);
            this.avatar.hidden = false;
        }
    }

    get(name, about, avatar) {
        this.user.patchUser({
            name: name,
            about: about
        })
        .then(user => {
            const { name, about } = user;
            this.add(name, about);
        })
        .catch(err => {
            console.log('Ошибка отправки на сервер текста', err);
        });

        if (!!avatar) {
            this.patchPhoto(avatar);
        }
    }

    patchPhoto(avatar) {
        this.user.patchUser({
            avatar: avatar
        })
        .then(photo => {
            console.log(photo);
        })
        .catch(err => {
            console.log('Ошибка отправки на сервер фото', err);
        });
    }

    render() {
        this.user.getUser()
            .then(data => {
                const { name, about, avatar } = data;
                this.add(name, about, avatar);
            });
    }
}

// avatar https://sun9-52.userapi.com/c849324/v849324468/18988f/uVZ8k_SNDDA.jpg
// Илья Карпов
// Junior web-developer