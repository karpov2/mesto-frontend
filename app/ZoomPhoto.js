// Увеличение фотографии карточки
class ZoomPhoto extends Popup {
    constructor(params) {
        super();
        this.param = params;
        this.img = document.querySelector(`.${params.img}`);
    }

    // Открыть фото
    add() {
        // Подставить конкретное фото
        this.img.src = event.target.style.backgroundImage.slice(5, -2);
        this.img.onload = () => this.open(this.param);
    }

    // Закрыть фото
    delete() {
        this.close();
        this.img.src = '';
    }
}