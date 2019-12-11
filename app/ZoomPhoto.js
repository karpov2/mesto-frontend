// Увеличение фотографии карточки
class ZoomPhoto extends Popup {
    constructor(params) {
        super();
        this.popUp = cardList.container.querySelector(`.${params.popUp}`);
        this.img = this.popUp.querySelector(`.${params.img}`);
    }

    // Открыть фото
    add() {
        // Подставить конкретное фото
		this.img.src = event.target.style.backgroundImage.slice(5, -2);
    }

    // Закрыть фото
    delete() {
        this.img.src = '';
    }
}