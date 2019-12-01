// Это класс для всплывающего окна
class Popup {
	constructor() {
        console.log('class Popup');
		// Подключаемся к конкретному контейнеру popup
        this.popup = null;
        this.opened = null;
    }

    // Открыть popup
    open(params) {
        console.log('class Popup -- metod: open');
        this.popup = rootMasterContainer.querySelector(`.${params.popUp}`);
        this.opened = params.open;

        this.popup.classList.add(this.opened);
    }

    // Закрыть popup
    close() {
        console.log('class Popup -- metod: close');
        this.popup.classList.remove(this.opened);
    }
}