// Это класс для всплывающего окна
class Popup {
	constructor() {
		// Подключаемся к конкретному контейнеру popup
        this.popup = null;
        this.opened = null;
    }

    // Открыть popup
    open(params) {
        this.popup = rootMasterContainer.querySelector(`.${params.popUp}`);
        this.opened = params.open;

        this.popup.classList.add(this.opened);
    }

    // Закрыть popup
    close() {
        this.popup.classList.remove(this.opened);
    }
}