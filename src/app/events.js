import * as dom from './DOM.js';
import * as index from './index.js';

/*
 * Объявление событий
 */

// Обработчик клика по сердечку
// Удаление карточки
const Events = event => {
    // Лайк карточки
    if (event.target.classList.contains(htmlCard.like)) {
        card.like();
    }

    // Удаление карточки
    if (event.target.classList.contains(htmlCard.remove)) {
        card.remove();
    }

    // Увеличиваем (открываем) фото или закрываем
    if (event.target.classList.contains(htmlCard.image)) {
        // Открыть фото
        zoomPhoto.add();
    } else if (
        event.target.classList.contains(htmlPopUpPhoto.close) &&
        event.target.closest(`.${htmlPopUpPhoto.popUp}`)
    ) {
        // Закрыть фото
        zoomPhoto.delete();
    }

    // Открываем popup форму «Редактирование профиля»
    if (event.target.classList.contains(htmlPopUpEdit.button)) {
        form.formData(htmlPopUpEdit, validation, profile);
        form.value(
            profile.name.textContent,
            profile.about.textContent
        );
        form.open(htmlPopUpEdit);
        form.validation.check(form.form);
        form.setAddEventListener();
    } else if (
        event.target.classList.contains(htmlPopUpEdit.close) &&
        event.target.closest(`.${htmlPopUpEdit.popUp}`)
    ) {
        form.reset();
    }

    // Открываем popup форму «Новое место»
    if (event.target.classList.contains(htmlPopUpAdd.button)) {
        form.formData(htmlPopUpAdd, validation, cardList);
        form.open(htmlPopUpAdd);
        form.setAddEventListener();
    } else if (
        event.target.classList.contains(htmlPopUpAdd.close) &&
        event.target.closest(`.${htmlPopUpAdd.popUp}`)
    ) {
        form.reset();
    }
};

const load = () => {
    console.dir(index);
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