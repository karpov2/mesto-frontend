/*
 * Объявление переменных
 */

// Основной контейнер
const rootMasterContainer = document.querySelector('.root'),
	// Список карточек
	placesList = rootMasterContainer.querySelector('.places-list'),
	// Кнопка "+" открытия popup окна
	userInfoAdd = rootMasterContainer.querySelector('.user-info__add'),
	// Кнопка "Edit" открытия popup окна
	userInfoEdit = rootMasterContainer.querySelector('.user-info__edit'),
	// Крестик - закрытие popup окна
	popupClose = rootMasterContainer.querySelector('.popup__close'),
	// Форма
	form = document.forms.new;

const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	},
	{
		name: 'Нургуш',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
	},
	{
		name: 'Тулиновка',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
	},
	{
		name: 'Остров Желтухина',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
	},
	{
		name: 'Владивосток',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
	}
];

/*
 * Объявление функций
 */

// Добавление карточки в разметку при загрузке страницы
function loadedAddList() {
	Object.keys(initialCards).forEach(function(item) {
		let cardName = initialCards[item].name,
			cardImage = initialCards[item].link;

		// В блок placesList добавляем создданный div placeCard
		placesList.appendChild(createElementsList(cardName, cardImage));
	});
}

// Создание новых карточек
function createElementsList(nameValue, infoValue) {
	// Создание родительского контейнера -> "place-card"
	const placeCard = document.createElement('div');
	// Создание блока для фона карточки -> "place-card__image"
	const placeCardImage = document.createElement('div');
	// Создание кнопки удаления карточки -> "place-card__delete-icon"
	const placeCardDeleteIcon = document.createElement('button');
	// Создание контейнера для описания карточки -> "place-card__description"
	const placeCardDescription = document.createElement('div');
	// Создание заголовка карточки -> "place-card__name"
	const placeCardName = document.createElement('h3');
	// Создание кнопки like для карточки -> "place-card__like-icon"
	const placeCardLikeIcon = document.createElement('button');

	placeCard.classList.add('place-card');
	placeCardImage.classList.add('place-card__image');
	placeCardImage.style.backgroundImage = `url(${infoValue})`;
	placeCardDeleteIcon.classList.add('place-card__delete-icon');
	placeCardDescription.classList.add('place-card__description');
	placeCardName.classList.add('place-card__name');
	placeCardName.textContent = nameValue;
	placeCardLikeIcon.classList.add('place-card__like-icon');

	// В блок placeCard добавляем создданный div placeCardImage
	placeCard.appendChild(placeCardImage);
	// В блок placeCardImage добавляем создданный button placeCardDeleteIcon
	placeCardImage.appendChild(placeCardDeleteIcon);
	// В блок placeCard добавляем создданный div placeCardDescription
	placeCard.appendChild(placeCardDescription);
	// В блок placeCardDescription добавляем создданный h3 placeCardName
	placeCardDescription.appendChild(placeCardName);
	// В блок placeCardDescription добавляем создданный button placeCardLikeIcon
	placeCardDescription.appendChild(placeCardLikeIcon);

	// Выводим список карточек
	return placeCard;
}

// Добавление карточки в разметку
function addList(event) {
	event.preventDefault();

		// Имя в форме
	let {name, info, submit} = form.elements;

	// В блок placesList добавляем создданный div placeCard
	placesList.appendChild(createElementsList(name.value, info.value));

	// Сброс формы
	form.reset();
	// Закрытие popup по срабатыванию
	popUpForm();
	// Снова блокируем кнопку формы
	submit.setAttribute('disabled', true);
}

// Открытие и закрытие popup
function popUpForm(event) {
	const popUp = rootMasterContainer.querySelector('.popup');

	// Условие: если popup открыт больше не заходить в эти условия
	if (!popUp.classList.contains('popup_is-opened')) {
		// Если нужно отредактировать профиль
		if (event.target.textContent === 'Edit') {
			console.log('Edit button');

			const formEdit = {
				title: 'Редактировать профиль',
				name: {
					placeholder: 'Имя'
				},
				info: {
					placeholder: 'О себе',
					type: 'text',
					minlength: '2',
					maxlength: '30'
				},
				button: {
					name: 'Сохранить',
					fontSize: 18
				}
			};

			popUpFormContent(formEdit);

		} 
		
		// Если нужно добавить новое место
		if (event.target.textContent === '+') {
			console.log('DDDD');
			// console.dir(event.target);

			const formAdd = {
				title: 'Новое место',
				name: {
					placeholder: 'Название'
				},
				info: {
					placeholder: 'Ссылка на картинку',
					type: 'url'
				},
				button: {
					name: '+',
					fontSize: 36
				}
			};

			popUpFormContent(formAdd);
		}
	}

	// Изминения контента popup
	function popUpFormContent({title, name, info, button}) {
		const popUpTitle = popUp.querySelector('.popup__title'),
			  popUpInputName = popUp.querySelector('.popup__input_type_name'),
			  popUpInputInfo = popUp.querySelector('.popup__input_type_info'),
			  popUpButton = popUp.querySelector('.popup__button');

		// Название формы
		popUpTitle.textContent = title;
		// Имя первого поля
		popUpInputName.placeholder = name.placeholder;
		// Имя и атрибуты второго поля
		popUpInputInfo.placeholder = info.placeholder;
		// Условие добавления атрибута minlength
		// В поле для ссылки он не нужен
		if (info.minlength) {
			popUpInputInfo.minLength = info.minlength;
			popUpInputInfo.maxLength = info.maxlength;
		} else {
			popUpInputInfo.removeAttribute('minlength');
			popUpInputInfo.removeAttribute('maxlength');
		}
		popUpInputInfo.type = info.type;
		// Кнопка формы
		popUpButton.textContent = button.name;
		popUpButton.style.fontSize = `${button.fontSize}px`;
	}

	// Показываем или скрываем popup
	rootMasterContainer.querySelector('.popup')
					   .classList.toggle('popup_is-opened');

	// Событие клика на кнопку - для закрытия формы
	popupClose.addEventListener('click', popUpForm);
	// Событие ввода в input - для условий формы
	form.addEventListener('input', inputHandler);
	// Событие отправки формы
	form.addEventListener('submit', addList);
}

// Обработчик клика по сердечку
// Удаление карточки
function likeVsRemove(event) {
	// Обработчик клика по сердечку
	if (event.target.classList.contains('place-card__like-icon')) {
		event.target.classList.toggle('place-card__like-icon_liked');
	}

	// Удаление карточки
	if (event.target.classList.contains('place-card__delete-icon')) {
		placesList.removeChild(event.target.closest('.place-card'));
	}
}

// Обработчик события input
function inputHandler(event) {
	const {name, info, submit} = event.currentTarget.elements,
		  popUpErrorName = event.currentTarget.querySelector('.popup__error_name'),
		  popUpErrorInfo = event.currentTarget.querySelector('.popup__error_info');

    // Условие блокировки кнопки формы
	// Если поля пустые
	
	// if (name.value.length === 0) {
	// 	disabledButton();
	// 	popUpErrorName.textContent = 'Это обязательное поле';
	// } else {
	// 	noDisabledButton();
	// 	popUpErrorName.textContent = '';
	// }
	
	// if (info.value.length === 0) {
	// 	disabledButton();
	// 	popUpErrorInfo.textContent = 'Это обязательное поле';
	// } else {
	// 	noDisabledButton();
	// 	popUpErrorInfo.textContent = '';
    // }

    const specialSymbol = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '/', '§'];
    // Имя содержит только буквы
    // Проверяем, была ли введена цифра
    // name.value.split('').forEach(function(item) {
    //     if (!Number.isNaN(+item) || specialSymbol.includes(item)) {
    //         disabledButton();
    //     } else {
    //         noDisabledButton();
    //     }
	// });
	// console.log(!event.target.validity.valid);
	// console.log(event.target === name);
	// console.dir();

	if (event.target === name) {
		// Проверка на валидность атрибутам и типу
		if (!name.validity.valid) {
			disabledButton();
			// console.dir(name);
			if (name.value.length < 2) popUpErrorName.textContent = 'Должно быть от 2 до 30 символов';
			if (name.value.length === 0) popUpErrorName.textContent = 'Это обязательное поле';
		} else {
			popUpErrorName.textContent = null;
		}
	}

	if (event.target === info) {
		// Проверка на валидность атрибутам и типу
		if (!info.validity.valid) {
			disabledButton();
			console.dir(info);
			if (info.type === 'text') {
				if (info.value.length < 2) popUpErrorInfo.textContent = 'Должно быть от 2 до 30 символов';
			}
			if (info.value.length === 0) popUpErrorInfo.textContent = 'Это обязательное поле';
		} else {
			popUpErrorInfo.textContent = null;
		}
	}

    const linkProtocol = ['https', 'http'];
    // Ссылка ничинаться с https/http
    // Проверяем, содержит ли ссылка протокол
    // linkProtocol.forEach(function(item) {
    //     if (!info.value.includes(item)) {
    //         disabledButton();
    //     } else {
    //         noDisabledButton();
    //     }
	// });
	
	// Блокировка кнопки формы
	function disabledButton() {
		submit.setAttribute('disabled', true);
	}
	// Разблокировка кнопки формы
	function noDisabledButton() {
		submit.removeAttribute('disabled');
	}
}

/*
 * Обработчики событий
 */

// Событие загрузки страницы
window.addEventListener('load', loadedAddList);
// Событие клика на кнопку "+" - для открытия формы
userInfoAdd.addEventListener('click', popUpForm);
// Событие клика на кнопку "Edit" - для открытия формы
userInfoEdit.addEventListener('click', popUpForm);
// Событие клика на кнопку - like
placesList.addEventListener('click', likeVsRemove);