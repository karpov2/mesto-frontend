/*
 * Объявление переменных
 */

// Классы добавил в свойства обьектов - что бы удобно переиспользовать и переопределять

const htmlListCard = {
    list: 'places-list'
};

const user = {
    _id: '52edaf937c24d358ab22d3e0'
};

// Классы html разметки «Карточки»
const htmlCard = {
    image: 'place-card__image', // Изображение
    like: 'place-card__like-icon', // Лайк
    isLiked: 'place-card__like-icon_liked', // Активный лайк
    counterLikes: 'place-card__like-counter', // Счетчик лайков
    remove: 'place-card__delete-icon', // Кнопка удаление
    card: 'place-card', // Родительский контейнер
    ...htmlListCard
};

// Классы html разметки «Формы»
const htmlForm = {
    error: {
        // Ошибки валидации
        container: {
            // DOM контейнер ошибок валидации
            name: 'popup__error_name',
            info: 'popup__error_info'
        },
        text: {
            // Текст ошибок валидации
            valueMissing: 'Это обязательное поле',
            tooShort: 'Должно быть от 2 до 30 символов',
            typeMismatch: 'Введите URL'
        }
    }
};

// Классы html разметки «PopUp»
const htmlPopUp = {
    open: 'popup_is-opened', // Display: block, появление (открытие) контейнера
    close: 'popup__close' // Закрыть
};

// Профиль: 'Имя' и 'О себе'
const userProfile = {
	name: 'user-info__name',
    about: 'user-info__job',
    avatar: 'user-info__photo'
};

// Классы html разметки «Редактирование профиля»
const htmlPopUpEdit = {
	// addContent: profile,
    form: 'formProfile',
    button: 'user-info__edit', // Кнопка открытия формы
    popUp: 'popup_edit-profile', // Родительский контейнер
    ...htmlPopUp,
    ...htmlForm
};

// Классы html разметки «Новое место»
const htmlPopUpAdd = {
    // addContent: cardList,
    form: 'formCards',
    button: 'user-info__add', // Кнопка открытия формы
    popUp: 'popup_add-item', // Родительский контейнер
    ...htmlPopUp,
    ...htmlForm
};

// Классы html разметки «Увеличенного фото карточки»
const htmlPopUpPhoto = {
    popUp: 'popup-image', // Родительский контейнер
    img: 'popup-image__img', // Изображение
    ...htmlPopUp
};

// 'cards'
// 'users/me'

const connectionApi = {
    url: 'http://95.216.175.5',
    group: 'cohort6',
    method: {
        get: 'GET',
        post: 'POST',
        patch: 'PATCH',
        put: 'PUT',
        delete: 'DELETE',
    },
    headers: {
        token: '168a5e64-116b-4823-bcb6-e65bb6a0c4f2',
        type: 'application/json'
    }
};

const htmlPreloading = {
    container: 'spinner',
    visible: 'spinner_visible'
};