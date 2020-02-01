// Это класс для всплывающего окна
export class Popup {
    // Открыть popup
    open(params) {
        this.popup = document.querySelector(`.${params.popUp}`);
        this.opened = params.open;

        this.popup.classList.add(this.opened);
    }

    // Закрыть popup
    close() {
        this.popup.classList.remove(this.opened);
    }
}