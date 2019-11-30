/*
 * Объявление переменных
 */

// Основной контейнер
const rootMasterContainer = document.querySelector(".root");

const htmlListCard = {
	container: 'places-list'
};

// Классы html разметки «Карточки»
const htmlCard = {
    image: "place-card__image", // Изображение
    like: "place-card__like-icon", // Лайк
    isLiked: "place-card__like-icon_liked", // Активный лайк
    remove: "place-card__delete-icon" // Удаление
};

// Классы html разметки «Формы»
const htmlForm = {
    error: {
        // Ошибки валидации
        container: {
            // DOM контейнер ошибок валидации
            name: "popup__error_name",
            info: "popup__error_info"
        },
        text: {
            // Текст ошибок валидации
            valueMissing: "Это обязательное поле",
            tooShort: "Должно быть от 2 до 30 символов",
            typeMismatch: "Введите URL"
        }
    }
};

// Классы html разметки «PopUp»
const htmlPopUp = {
    open: "popup_is-opened", // Display: block, появление (открытие) контейнера
    close: "popup__close" // Закрыть
};

// Профиль: "Имя" и "О себе"
const userProfile = {
	name: 'user-info__name',
	info: 'user-info__job'
};

// Классы html разметки «Редактирование профиля»
const htmlPopUpEdit = {
	addContent: new Profile(userProfile),
    form: "formProfile",
    button: "user-info__edit", // Кнопка открытия формы
    popUp: "popup_edit-profile", // Родительский контейнер
    ...htmlPopUp,
    ...htmlForm
};

// Классы html разметки «Новое место»
const htmlPopUpAdd = {
    form: "formCards",
    button: "user-info__add", // Кнопка открытия формы
    popUp: "popup_add-item", // Родительский контейнер
    ...htmlPopUp,
    ...htmlForm
};

// Классы html разметки «Увеличенного фото карточки»
const htmlPopUpPhoto = {
    popUp: "popup-image", // Родительский контейнер
    img: "popup-image__img", // Изображение
    ...htmlPopUp
};

const cardList = new CardList(htmlListCard, initialCards);
const card = new Card(htmlCard);

const popup = new Popup();
const zoomPhoto = new ZoomPhoto(htmlPopUpPhoto);

const formEdit = new Form(htmlPopUpEdit);
// const profile = new Profile(userProfile);

/*
 * Объявление функций
 */

// Изменение профиля в разметке "Имя", "О себе"
// const createElementsProfile = (nameValue, infoValue) => {
// 	userInfoName.textContent = nameValue;
// 	userInfoJob.textContent = infoValue;
// };

// Обработка формы профиля
// const addProfile = event => {
// 	event.preventDefault();

// 	// Элементы формы
// 	let { name, info, submit } = formProfile.elements;

// 	createElementsProfile(name.value, info.value);

// 	// Сброс формы
// 	formProfile.reset();
// 	// Закрытие popup по срабатыванию
// 	openPopUpFormProfile(event);
// 	// Снова блокируем кнопку формы
// 	submit.setAttribute('disabled', true);
// };

//Обработка формы добавления нового места
// const addList = event => {
// 	event.preventDefault();

// 	// Элементы формы
// 	let { name, info, submit } = formCards.elements;

// 	// В блок placesList добавляем создданный div place-card
// 	placesList.insertAdjacentHTML(
// 		'beforeend',
// 		createElementsList(name.value, info.value)
// 	);

// 	// Сброс формы
// 	formCards.reset();
// 	// Закрытие popup по срабатыванию
// 	openPopUpFormCards(event);
// 	// Снова блокируем кнопку формы
// 	submit.setAttribute('disabled', true);
// };

// Открытие и закрытие popup
// Добавление нового места
// const openPopUpFormCards = event => {
// 	popUpAddItem.classList.toggle('popup_is-opened');
// 	// Событие отправки формы
// 	formCards.addEventListener('submit', addList);
// 	// Событие клика на кнопку - для закрытия формы
// 	popUpAddClose.addEventListener('click', openPopUpFormCards);
// 	// Событие ввода в input - для условий формы
// 	formCards.addEventListener('input', inputHandler);

// 	if (event.target === popUpAddClose) {
// 		// Сброс формы
// 		formCards.reset();
// 		formCards.querySelector('.popup__error_name').textContent = null;
// 		formCards.querySelector('.popup__error_info').textContent = null;
// 	}
// };

// Открытие и закрытие popup
// Редактирование профиля
// const openPopUpFormProfile = event => {
// 	popUpProfileItem.classList.toggle('popup_is-opened');

// 	// Элементы формы
// 	const { name, info, submit } = formProfile.elements;
// 	name.value = userInfoName.textContent;
// 	info.value = userInfoJob.textContent;

// 	submit.removeAttribute('disabled'); // вызвать функцию

// 	// Событие отправки формы
// 	formProfile.addEventListener('submit', addProfile);
// 	// Событие клика на кнопку - для закрытия формы
// 	popUpProfileClose.addEventListener('click', openPopUpFormProfile);
// 	// Событие ввода в input - для условий формы
// 	formProfile.addEventListener('input', inputHandler);

// 	if (event.target === popUpProfileClose) {
// 		// Сброс ошибок валидации
// 		formProfile.querySelector('.popup__error_name').textContent = null;
// 		formProfile.querySelector('.popup__error_info').textContent = null;
// 	}
// };

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
        popup.open(htmlPopUpEdit);
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
		popup.open(htmlPopUpAdd);
    } else if (
        event.target.classList.contains(htmlPopUpAdd.close) &&
        event.target.closest(`.${htmlPopUpAdd.popUp}`)
    ) {
        popup.close();
    }
};

/*
 * Обработчики событий
 */

// Событие загрузки страницы
window.addEventListener("load", cardList.render());
// Событие клика
rootMasterContainer.addEventListener("click", Events);