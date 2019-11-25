/*
 * Объявление переменных
 */

// Основной контейнер
const rootMasterContainer = document.querySelector('.root');

// Список карточек
const placesList = rootMasterContainer.querySelector('.places-list');
const placeCard = placesList.querySelectorAll('.place-card');

// Всплывающее фото
const popUpImage = rootMasterContainer.querySelector('.popup-image');
const popUpAddImage = popUpImage.querySelector('.popup-image__img');
const popUpImageClose = popUpImage.querySelector('.popup-image__close');

// Кнопка "Edit" открытия popup окна
const userInfoEdit = rootMasterContainer.querySelector('.user-info__edit');
// Форма для редактирования профиля
const popUpProfileItem = rootMasterContainer.querySelector('.popup_edit-profile');
const popUpProfileClose = popUpProfileItem.querySelector('.popup__close');
// Профиль: "Имя" и "О себе"
const userInfoName = rootMasterContainer.querySelector('.user-info__name');
const userInfoJob = rootMasterContainer.querySelector('.user-info__job');

// Кнопка "+" открытия popup окна
const userInfoAdd = rootMasterContainer.querySelector('.user-info__add');
// Форма для добавления нового места
const popUpAddItem = rootMasterContainer.querySelector('.popup_add-item');
const popUpAddClose = popUpAddItem.querySelector('.popup__close');

// Форма
const { formCards, formProfile } = document.forms;

const lang = {
	valueMissing: 'Это обязательное поле',
	tooShort: 'Должно быть от 2 до 30 символов',
	typeMismatch: 'Введите URL'
};

/*
 * Объявление функций
 */

// Это класс, создающий карточку
class Card {
	constructor() {
		console.log('Card constructor');
	}

	// Лайк карточки 
	like() {
		event.target.classList.toggle('place-card__like-icon_liked');
	}

	// Удаление карточки 
	remove() {
		placesList.removeChild(event.target.closest('.place-card'));
	}

	// Открыть или закрыть фото
	photo() {
		console.log(event.target);
		console.log(this);
		popUpImage.classList.toggle('popup-image_is-opened');
	}

	// Он будет создавать DOM-элемент карточки
	create(nameValue, infoValue) {
		console.log('Card create');
		// Выводим список карточек
		return `
		<div class="place-card">
			<div class="place-card__image" style="background-image: url(${infoValue});">
				<button class="place-card__delete-icon"></button>
			</div>
			<div class="place-card__description">
				<h3 class="place-card__name">${nameValue}</h3>
				<button class="place-card__like-icon"></button>
			</div>
		</div>
		`;
	}
}

// Это класс для хранения и отрисовки карточек
class CardList {
	// Метод constructor этого класса должен принимать два параметра:
	// DOM-элемент — контейнер, куда нужно складывать карточки;
	// Массив карточек, которые будут на странице при загрузке.
	constructor(domCard, arrayCard) {
		this.container = domCard;
		this.card = arrayCard;
		console.log('CardList constructor');
	}

	// addCard для добавления карточки в список
	addCard() {

	}

	// render для отрисовки карточек при загрузке страницы
	render(cards) {
		const cardElement = new Card();

		cards.forEach(item => {
			const { name, link } = item;

			// В блок placesList добавляем создданный div placeCard
			this.container.insertAdjacentHTML('beforeend', cardElement.create(name, link));
		});
	}
}

const cardList = new CardList(placesList, placeCard);

// Это класс для всплывающего окна
class Popup {
	// Показывать попап
	open() {

	}

	// Скрывать попап
	close() {

	}
}

// Добавление карточки в разметку при загрузке страницы
// const loadedAddList = (cards) => {
// 	cards.forEach(item => {
// 		let { name, link } = item;

// 		// В блок placesList добавляем создданный div placeCard
// 		placesList.insertAdjacentHTML('beforeend', createElementsList(name, link));
// 	});
// };

// Создание новых карточек
// const createElementsList = (nameValue, infoValue) => {
// 	// Выводим список карточек
// 	return `
// 	<div class="place-card">
// 		<div class="place-card__image" style="background-image: url(${infoValue});">
// 			<button class="place-card__delete-icon"></button>
// 		</div>
// 		<div class="place-card__description">
// 			<h3 class="place-card__name">${nameValue}</h3>
// 			<button class="place-card__like-icon"></button>
// 		</div>
// 	</div>
// 	`;
// };

// Изменение профиля в разметке "Имя", "О себе"
const createElementsProfile = (nameValue, infoValue) => {
	userInfoName.textContent = nameValue;
	userInfoJob.textContent = infoValue;
};

// Обработка формы профиля
const addProfile = (event) => {
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
const addList = (event) => {
	event.preventDefault();

	// Элементы формы
	let { name, info, submit } = formCards.elements;

	// В блок placesList добавляем создданный div place-card
	placesList.insertAdjacentHTML('beforeend', createElementsList(name.value, info.value));

	// Сброс формы
	formCards.reset();
	// Закрытие popup по срабатыванию
	openPopUpFormCards(event);
	// Снова блокируем кнопку формы
	submit.setAttribute('disabled', true);
};

// Открытие и закрытие popup
// Добавление нового места
const openPopUpFormCards = (event) => {
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
const openPopUpFormProfile = (event) => {
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

// Обработчик клика по сердечку
// Удаление карточки
const distributionCardEvents = (event) => {
	const card = new Card();

	// Обработчик клика по сердечку
	if (event.target.classList.contains('place-card__like-icon')) {
		card.like();
	}

	// Удаление карточки
	if (event.target.classList.contains('place-card__delete-icon')) {
		card.remove();
	}

	// Открываем фото или закрываем
	// Добавляем конкретное фото
	if (event.target.classList.contains('place-card__image')) {
		// Подставить конкретное фото
		popUpAddImage.src = event.target.style.backgroundImage.slice(5, -2);
		console.log(event.target);
		// Открыть фото
		card.photo();
	} else if (event.target === popUpImageClose) {
		// Закрыть фото
		console.log(event.target);
		card.photo();
	}
};

// Открываем фото или закрываем
// Добавляем конкретное фото
// const popUpImg = (event) => {
// 	// Открыть или закрыть фото
// 	const popUpIsOpened = () => {
// 		popUpImage.classList.toggle('popup-image_is-opened');
// 	};

// 	if (event.target.classList.contains('place-card__image')) {
// 		// Подставить конкретное фото
// 		popUpAddImage.src = event.target.style.backgroundImage.slice(5, -2);

// 		// Открыть фото
// 		popUpIsOpened();
// 	} else if (event.target === popUpImageClose) {
// 		// Закрыть фото
// 		popUpIsOpened();
// 	}
// };

// Обработчик события input
const inputHandler = (event) => {
	const { name, info, submit } = event.currentTarget.elements;
	const popUpErrorName = event.currentTarget.querySelector('.popup__error_name');
	const popUpErrorInfo = event.currentTarget.querySelector('.popup__error_info');

	if (event.target === name) {
		if (name.validity.valueMissing) {
			popUpErrorName.textContent = lang.valueMissing;
		} else if (name.validity.tooShort) {
			popUpErrorName.textContent = lang.tooShort;
		} else {
			popUpErrorName.textContent = null;
		}
	}

	if (event.target === info) {
		if (info.validity.valueMissing) {
			popUpErrorInfo.textContent = lang.valueMissing;
		} else if (info.validity.tooShort) {
			popUpErrorInfo.textContent = lang.tooShort;
		} else if (info.validity.typeMismatch) {
			popUpErrorInfo.textContent = lang.typeMismatch;
		} else {
			popUpErrorInfo.textContent = null;
		}
	}

	// Разблокировка кнопки формы
	if (name.validity.valid && info.validity.valid) {
		submit.removeAttribute('disabled');
	} else { // Блокировка кнопки формы
		submit.setAttribute('disabled', true);
	}

};

/*
 * Обработчики событий
 */

// Событие загрузки страницы
window.addEventListener('load', cardList.render(initialCards));
// Событие клика на кнопку "+" - для открытия формы
userInfoAdd.addEventListener('click', openPopUpFormCards);
// Событие клика на кнопку "Edit" - для открытия формы
userInfoEdit.addEventListener('click', openPopUpFormProfile);
// Событие клика на кнопку - like
placesList.addEventListener('click', distributionCardEvents);
// Событие клика по фото
// placesList.addEventListener('click', popUpImg);
// popUpImageClose.addEventListener('click', popUpImg);




/*

Здравствуйте

Правильно что используете event.target

Хорошо, вы многое исправили но надо исправить ошибку в консоли.
ПРи изменении имени в консоли возникает ошибка
script.js:147 Uncaught TypeError: Cannot read property 'target' of undefined
    at openPopUpFormProfile (script.js:147)
	at HTMLFormElement.addProfile (script.js:84)

	-------------
	Илья: хех, не увидел - передал функциям event
	-------------

При добавлении карточки
script.js:119 Uncaught TypeError: Cannot read property 'target' of undefined
    at openPopUpFormCards (script.js:119)
	at HTMLFormElement.addList (script.js:102)

	-------------
	Илья: хех, не увидел - передал функциям event
	-------------

 lang вынесите за функцию в самый вверх

	-------------
	Илья: вынес lang
	-------------

Вынесите за функцию слушатель
popUpAddClose.addEventListener('click', openPopUpFormCards);
вы пытаетесь вызвать функцию в которой вешаете слушатель

	-------------
	Илья: получается замыкание? что плохого?
	Я вызываю слушатель внутри этой вынкции - потому что он нужен только после вызова этой вынкции.
	Функция открывает popUp, и слушатель нужен - что бы закрыть popUp
	Таких слушателей 2 на каждую форму popUp (вы написали про 1)

	Вы пишите замечание - но не обьясняете подробнее
	Если эти событие точно нужно вынести отдельно (напишите почему), пока я оставлю так
	-------------

// Создание новых карточек очень хорошо сделали, мне понравилось
const createElementsList = (nameValue, infoValue) => {

Снова здравствуйте
Спасибо что исправили ошибки. 

   --- Вы пишите замечание - но не обьясняете подробнее
   --- Если эти событие точно нужно вынести отдельно (напишите почему), пока я оставлю так
Потому что вы код пишите не только для себя, но и для людей. Работая в большой команде над большим проектом
Вы должны будете не только писать рабочий код, но и понятный другим участникам команды, а так 
же людям которые после вас будут этот код поддерживать. В текущие ситуации вы создаёте дополнительную путаницу, 
вешая слушатель в функцию которую вы же и вызываете. Повешайте на родителя один раз и используйте постоянно

Привёл пример кода адаптированный под ваш код. Не назову его идеальным, так как и структуру HTML кода надо менять
Popup для добавления фото я бы перенёс в root__section

Работа принимается

// пример кода с событиями для улучшения 
function myFuncPopup(e) {
	if (e.target.closest('.button user-info__edit') || e.target.closest('.user-info__edit')) {
		console.log('здесь вызов какой то функции редактирования профиля');
	}

	if (e.target.closest('.user-info__add')) {
		console.log('здесь вызов какой то функции для добавления фото');
	}

	if (e.target.closest('.popup__close') || e.target.closest('.popup__button')) {
		console.log('здесь вызов какой то другой функции, ничего здесь не городим, просто вызываем');

	}
};

const placesCard = document.querySelector('.root');
placesCard.addEventListener('click', myFuncPopup);

*/