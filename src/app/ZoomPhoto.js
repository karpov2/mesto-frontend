import {Popup} from './Popup.js';

// Увеличение фотографии карточки
export class ZoomPhoto extends Popup {
    constructor(params) {
        super();
        this.param = params;
        this.img = document.querySelector(`.${params.img}`);
    }

    // Открыть фото
    add() {
        // Подставить конкретное фото
        this.img.src = event.target.src;
        this.img.onload = () => this.open(this.param);
    }

    // Закрыть фото
    delete() {
        this.close();
        this.img.src = '';
    }
}