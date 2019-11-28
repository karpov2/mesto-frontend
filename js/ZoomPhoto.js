// Увеличение фотографии карточки
class ZoomPhoto {
    constructor(params) {
        this.popUp = placesList.querySelector(`.${params.popUp}`);
        this.img = this.popUp.querySelector(`.${params.img}`);
        this.opened = params.open;
    }

    // Открыть фото
    open() {
        // Подставить конкретное фото
		this.img.src = event.target.style.backgroundImage.slice(5, -2);
        this.popUp.classList.add(this.opened);
        console.dir(this.img);
    }

    // Закрыть фото
    close() {
        this.popUp.classList.remove(this.opened);
        this.img.src = '';
    }
}