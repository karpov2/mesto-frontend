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
        zoomPhoto.open();
        popup.open(htmlPopUpPhoto);
    } else if (
        event.target.classList.contains(htmlPopUpPhoto.close) &&
        event.target.closest(`.${htmlPopUpPhoto.popUp}`)
    ) {
        // Закрыть фото
        popup.close();
        zoomPhoto.close();
    }

    // Открываем popup форму «Редактирование профиля»
    if (event.target.classList.contains(htmlPopUpEdit.button)) {
        console.log('open event Edit');
        htmlPopUpEdit.addContent.addValue();
        popup.open(htmlPopUpEdit);
        validation.check(formEdit.form);
        formEdit.setAddEventListener();
    } else if (
        event.target.classList.contains(htmlPopUpEdit.close) &&
        event.target.closest(`.${htmlPopUpEdit.popUp}`)
    ) {
		popup.close();
        formEdit.reset();
    }

    // Открываем popup форму «Новое место»
    if (event.target.classList.contains(htmlPopUpAdd.button)) {
        console.log('open event Add');
        popup.open(htmlPopUpAdd);
        formAdd.setAddEventListener();
    } else if (
        event.target.classList.contains(htmlPopUpAdd.close) &&
        event.target.closest(`.${htmlPopUpAdd.popUp}`)
    ) {
        popup.close();
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
