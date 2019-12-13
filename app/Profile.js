class Profile {
    constructor(params, api) {
        // Профиль: "Имя" и "О себе"
        this.name = document.querySelector(`.${params.name}`);
        this.about = document.querySelector(`.${params.about}`);
        this.avatar = document.querySelector(`.${params.avatar}`);

        this.user = api;
    }

    add(name, about, avatar) {
        this.name.textContent = name;
        this.about.textContent = about;
        document.querySelector('.spinner').style.display = 'block';
        this.avatar.src = avatar;
        this.avatar.onload = () => {
            this.avatar.hidden = false;
            document.querySelector('.spinner').style.display = 'none';
        }
        
        console.dir(this.avatar);
    }

    render() {
        this.user.getUser()
            .then(data => {
                const { name, about, avatar } = data;
                this.add(name, about, avatar);
            })
    }
}

// avatar https://sun9-52.userapi.com/c849324/v849324468/18988f/uVZ8k_SNDDA.jpg
// Илья Карпов
// Junior web-developer