/*
 * Объявление переменных
 */

// Основной контейнер
const rootMasterContainer = document.querySelector('.root');

// Список карточек
const placesList = rootMasterContainer.querySelector('.places-list');

// Профиль: "Имя" и "О себе"
const userInfoName = rootMasterContainer.querySelector('.user-info__name');
const userInfoJob = rootMasterContainer.querySelector('.user-info__job');

// Форма
const { formCards, formProfile } = document.forms;

// Текст ошибок валидации
const lang = {
	valueMissing: 'Это обязательное поле',
	tooShort: 'Должно быть от 2 до 30 символов',
	typeMismatch: 'Введите URL'
};

// Классы html разметки «Карточки»
const classCard = {
	image: 'place-card__image', // Изображение
	like: 'place-card__like-icon', // Лайк
	isLiked: 'place-card__like-icon_liked', // Активный лайк
	remove: 'place-card__delete-icon' // Удаление
};

// Классы html разметки «PopUp»
const classPopUp = {
	open: 'popup_is-opened', // Display: block, появление (открытие) контейнера
	close: 'popup__close', // Закрыть
};

// Классы html разметки «Редактирование профиля»
const classPopUpEdit = {
	button: 'user-info__edit', // Кнопка открытия формы
	popUp: 'popup_edit-profile', // Родительский контейнер
	...classPopUp
};

// Классы html разметки «Новое место»
const classPopUpAdd = {
	button: 'user-info__add', // Кнопка открытия формы
	popUp: 'popup_add-item', // Родительский контейнер
	...classPopUp
};

// Классы html разметки «Увеличенного фото карточки»
const classPopUpPhoto = {
	popUp: 'popup-image', // Родительский контейнер
	img: 'popup-image__img', // Изображение
	...classPopUp
};

const cardList = new CardList(placesList, initialCards);
const card = new Card(classCard);
const popupPhoto = new Popup(classPopUpPhoto);
const popupEdit = new Popup(classPopUpEdit);
const popupAdd = new Popup(classPopUpEdit);
const zoomPhoto = new ZoomPhoto(classPopUpPhoto);

/*
 * Объявление функций
 */

// Изменение профиля в разметке "Имя", "О себе"
const createElementsProfile = (nameValue, infoValue) => {
	userInfoName.textContent = nameValue;
	userInfoJob.textContent = infoValue;
};

// Обработка формы профиля
const addProfile = event => {
	event.preventDefault();

	// Элементы формы
	let { name, info, submit } = formProfile.elements;

	createElementsProfile(name.value, info.value);

	// Сброс формы
	formProfile.reset();
	// Закрытие popup по срабатыванию
	openPopUpFormProfile(event);
	// Снова блокируем кнопку формы
	submit.setAttribute('disabled', true);
};

//Обработка формы добавления нового места
const addList = event => {
	event.preventDefault();

	// Элементы формы
	let { name, info, submit } = formCards.elements;

	// В блок placesList добавляем создданный div place-card
	placesList.insertAdjacentHTML(
		'beforeend',
		createElementsList(name.value, info.value)
	);

	// Сброс формы
	formCards.reset();
	// Закрытие popup по срабатыванию
	openPopUpFormCards(event);
	// Снова блокируем кнопку формы
	submit.setAttribute('disabled', true);
};

// Открытие и закрытие popup
// Добавление нового места
const openPopUpFormCards = event => {
	popUpAddItem.classList.toggle('popup_is-opened');
	// Событие отправки формы
	formCards.addEventListener('submit', addList);
	// Событие клика на кнопку - для закрытия формы
	popUpAddClose.addEventListener('click', openPopUpFormCards);
	// Событие ввода в input - для условий формы
	formCards.addEventListener('input', inputHandler);

	if (event.target === popUpAddClose) {
		// Сброс формы
		formCards.reset();
		formCards.querySelector('.popup__error_name').textContent = null;
		formCards.querySelector('.popup__error_info').textContent = null;
	}
};

// Открытие и закрытие popup
// Редактирование профиля
const openPopUpFormProfile = event => {
	popUpProfileItem.classList.toggle('popup_is-opened');

	// Элементы формы
	const { name, info, submit } = formProfile.elements;
	name.value = userInfoName.textContent;
	info.value = userInfoJob.textContent;

	submit.removeAttribute('disabled'); // вызвать функцию

	// Событие отправки формы
	formProfile.addEventListener('submit', addProfile);
	// Событие клика на кнопку - для закрытия формы
	popUpProfileClose.addEventListener('click', openPopUpFormProfile);
	// Событие ввода в input - для условий формы
	formProfile.addEventListener('input', inputHandler);

	if (event.target === popUpProfileClose) {
		// Сброс ошибок валидации
		formProfile.querySelector('.popup__error_name').textContent = null;
		formProfile.querySelector('.popup__error_info').textContent = null;
	}
};

// Обработчик события input
// const inputHandler = event => {
// 	const { name, info, submit } = event.currentTarget.elements;
// 	const popUpErrorName = event.currentTarget.querySelector(
// 		'.popup__error_name'
// 	);
// 	const popUpErrorInfo = event.currentTarget.querySelector(
// 		'.popup__error_info'
// 	);

// 	if (event.target === name) {
// 		if (name.validity.valueMissing) {
// 			popUpErrorName.textContent = lang.valueMissing;
// 		} else if (name.validity.tooShort) {
// 			popUpErrorName.textContent = lang.tooShort;
// 		} else {
// 			popUpErrorName.textContent = null;
// 		}
// 	}

// 	if (event.target === info) {
// 		if (info.validity.valueMissing) {
// 			popUpErrorInfo.textContent = lang.valueMissing;
// 		} else if (info.validity.tooShort) {
// 			popUpErrorInfo.textContent = lang.tooShort;
// 		} else if (info.validity.typeMismatch) {
// 			popUpErrorInfo.textContent = lang.typeMismatch;
// 		} else {
// 			popUpErrorInfo.textContent = null;
// 		}
// 	}

// 	// Разблокировка кнопки формы
// 	if (name.validity.valid && info.validity.valid) {
// 		submit.removeAttribute('disabled');
// 	} else {
// 		// Блокировка кнопки формы
// 		submit.setAttribute('disabled', true);
// 	}
// };

// Обработчик клика по сердечку
// Удаление карточки
const Events = event => {
	// Лайк карточки
	if (event.target.classList.contains(classCard.like)) {
		card.like();
	}

	// Удаление карточки
	if (event.target.classList.contains(classCard.remove)) {
		card.remove();
	}

	// Увеличиваем (открываем) фото или закрываем
	if (event.target.classList.contains(classCard.image)) {
		// Открыть фото
		zoomPhoto.open();
		popupPhoto.open();
	} else if (
		event.target.classList.contains(classPopUpPhoto.close) &&
		event.target.closest(`.${classPopUpPhoto.popUp}`)
	) {
		// Закрыть фото
		popupPhoto.close();
		zoomPhoto.close();
	}

	// Открываем popup форму «Редактирование профиля»
	if (event.target.classList.contains(classPopUpEdit.button)) {
		popupEdit.open();
	} else if (
		event.target.classList.contains(classPopUpEdit.close) &&
		event.target.closest(`.${classPopUpEdit.popUp}`)
	) {
		popupEdit.close();
	}

	// Открываем popup форму «Новое место»
	if (event.target.classList.contains(classPopUpAdd.button)) {
		popupAdd.open();
	} else if (
		event.target.classList.contains(classPopUpAdd.close) &&
		event.target.closest(`.${classPopUpAdd.popUp}`)
	) {
		popupAdd.close();
	}
};

/*
 * Обработчики событий
 */

// Событие загрузки страницы
window.addEventListener('load', cardList.render());
// Событие клика на кнопку "+" - для открытия формы
// userInfoAdd.addEventListener('click', openPopUpFormCards);
// Событие клика на кнопку "Edit" - для открытия формы
// userInfoEdit.addEventListener('click', openPopUpFormProfile);
// Событие клика на кнопку - like
rootMasterContainer.addEventListener('click', Events);
