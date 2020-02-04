import * as dom from './DOM.js';
import * as index from './index.js';

/*
 * Объявление событий
 */

// Обработчик клика по сердечку
// Удаление карточки
const Events = event => {
    // Лайк карточки
    if (event.target.classList.contains(dom.htmlCard.like)) {
        index.card.like();
    }

    // Удаление карточки
    if (event.target.classList.contains(dom.htmlCard.remove)) {
        index.card.remove();
    }

    // Увеличиваем (открываем) фото или закрываем
    if (event.target.classList.contains(dom.htmlCard.image)) {
        // Открыть фото
        index.zoomPhoto.add();

        document.addEventListener('keydown', function closePopup(event) {
            if (event.keyCode === 27) {
                index.zoomPhoto.delete();
                document.removeEventListener('keydown', closePopup);
            }
        })
    } else if (
        event.target.classList.contains(dom.htmlPopUpPhoto.close) &&
        event.target.closest(`.${dom.htmlPopUpPhoto.popUp}`)
    ) {
        // Закрыть фото
        index.zoomPhoto.delete();
    }

    // Открываем popup форму «Редактирование профиля»
    if (event.target.classList.contains(dom.htmlPopUpEdit.button)) {
        index.form.formData(dom.htmlPopUpEdit, index.validation, index.profile);
        index.form.value(
            index.profile.name.textContent,
            index.profile.about.textContent
        );
        index.form.open(dom.htmlPopUpEdit);
        index.form.validation.check(index.form.form);
        index.form.setAddEventListener();

        document.addEventListener('keydown', function closePopup(event) {
            if (event.keyCode === 27) {
                index.form.reset();
                document.removeEventListener('keydown', closePopup);
            }
        })
    } else if (
        event.target.classList.contains(dom.htmlPopUpEdit.close) &&
        event.target.closest(`.${dom.htmlPopUpEdit.popUp}`)
    ) {
        index.form.reset();
    }

    // Открываем popup форму «Новое место»
    if (event.target.classList.contains(dom.htmlPopUpAdd.button)) {
        index.form.formData(dom.htmlPopUpAdd, index.validation, index.cardList);
        index.form.open(dom.htmlPopUpAdd);
        index.form.setAddEventListener();

        document.addEventListener('keydown', function closePopup(event) {
            if (event.keyCode === 27) {
                index.form.reset();
                document.removeEventListener('keydown', closePopup);
            }
        })
    } else if (
        event.target.classList.contains(dom.htmlPopUpAdd.close) &&
        event.target.closest(`.${dom.htmlPopUpAdd.popUp}`)
    ) {
        index.form.reset();
    }
};

const load = () => {
    index.cardList.render();
    index.profile.render();
};

/*
 * Обработчики событий
 */

// Событие загрузки страницы
window.addEventListener("load", load);
// Событие клика
document.addEventListener("click", Events);

export {Events, load};