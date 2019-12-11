// Увеличение фотографии карточки
class ZoomPhoto {
    constructor(params) {
        this.popUp = cardList.container.querySelector(`.${params.popUp}`);
        this.img = this.popUp.querySelector(`.${params.img}`);
    }

    // Открыть фото
    open() {
        // Подставить конкретное фото
		this.img.src = event.target.style.backgroundImage.slice(5, -2);
    }

    // Закрыть фото
    close() {
        this.img.src = '';
    }
}