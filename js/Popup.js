// Это класс для всплывающего окна
class Popup {
	constructor(params) {
		// Подключаемся к конкретному контейнеру popup
        this.popUp = rootMasterContainer.querySelector(`.${params.popUp}`);
        this.opened = params.open;
    }

    // Открыть popup
    open() {
        this.popUp.classList.add(this.opened);
    }

    // Закрыть popup
    close() {
        this.popUp.classList.remove(this.opened);
    }
}