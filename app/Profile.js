class Profile {
    constructor(params) {
        // Профиль: "Имя" и "О себе"
        this.name = params['root container'].querySelector(`.${params.name}`);
        this.info = params['root container'].querySelector(`.${params.info}`);
    }

    add(name, info) {
        this.name.textContent = name;
        this.info.textContent = info;
    }

    addValue() {
        formEdit.value(
            this.name.textContent,
            this.info.textContent
        );
    }
}