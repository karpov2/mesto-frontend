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
        htmlPopUpEdit.addContent.addValue();
        formEdit.open(htmlPopUpEdit);
        validation.check(formEdit.form);
        formEdit.setAddEventListener();
    } else if (
        event.target.classList.contains(htmlPopUpEdit.close) &&
        event.target.closest(`.${htmlPopUpEdit.popUp}`)
    ) {
        formEdit.reset();
    }

    // Открываем popup форму «Новое место»
    if (event.target.classList.contains(htmlPopUpAdd.button)) {
        formAdd.open(htmlPopUpAdd);
        formAdd.setAddEventListener();
    } else if (
        event.target.classList.contains(htmlPopUpAdd.close) &&
        event.target.closest(`.${htmlPopUpAdd.popUp}`)
    ) {
        formAdd.reset();
    }
};

/*
 * Обработчики событий
 */

// Событие загрузки страницы
window.addEventListener("load", cardList.render());
// Событие клика
rootContainer["root container"].addEventListener("click", Events);
