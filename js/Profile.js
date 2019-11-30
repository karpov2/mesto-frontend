class Profile {
    constructor(params) {
        // Профиль: "Имя" и "О себе"
        this.name = rootMasterContainer.querySelector(`.${params.name}`);
        this.info = rootMasterContainer.querySelector(`.${params.info}`);
    }

    add(name, info) {
        this.name.textContent = name;
        this.info.textContent = info;
    }
}