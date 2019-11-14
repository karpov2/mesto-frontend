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
const loadedAddList = () => {
	[...initialCards].forEach(item => {
		let { name, link } = item;

		// В блок placesList добавляем создданный div placeCard
		placesList.appendChild(createElementsList(name, link));
	});
};

// Создание новых карточек
const createElementsList = (nameValue, infoValue) => {
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

	// Подключаемся к кнопке закрытия фото
	const popUpClose = rootMasterContainer.querySelector('.popup-image__close');
	// Событие на открыть фото
	placeCardImage.addEventListener('click', popUpImg);
	// Событие на закрыть фото
	popUpClose.addEventListener('click', popUpImg);

	// Выводим список карточек
	return placeCard;
};

// Добавления контента профиля в разметку
const addProfile = (nameValue, infoValue) => {
	const userInfoName = rootMasterContainer.querySelector('.user-info__name');
	const userInfoJob = rootMasterContainer.querySelector('.user-info__job');

	userInfoName.textContent = nameValue;
	userInfoJob.textContent = infoValue;
};

// Добавление карточки в разметку
const addList = (event) => {
	event.preventDefault();

	// Имя в форме
	let { name, info, submit } = form.elements;

	// Если открылась форма для добавления карточки
	if (submit.textContent === '+') {
		// В блок placesList добавляем создданный div placeCard
		placesList.appendChild(createElementsList(name.value, info.value));
	}
	// Если открылась форма для изменения профиля
	else if (submit.textContent === 'Сохранить') {
		// В блок placesList добавляем создданный div placeCard
		addProfile(name.value, info.value);
	}

	// Сброс формы
	form.reset();
	// Закрытие popup по срабатыванию
	popUpForm();
	// Снова блокируем кнопку формы
	submit.setAttribute('disabled', true);
};

// Открытие и закрытие popup
const popUpForm = (event) => {
	const popUp = rootMasterContainer.querySelector('.popup'),
		popUpButton = popUp.querySelector('.popup__button');

	// Изминения контента popup
	const popUpFormContent = ({ title, name, info, button }) => {
		const popUpTitle = popUp.querySelector('.popup__title'),
			popUpInputName = popUp.querySelector('.popup__input_type_name'),
			popUpInputInfo = popUp.querySelector('.popup__input_type_info');

		// Название формы
		popUpTitle.textContent = title;
		// Имя первого поля
		popUpInputName.placeholder = name.placeholder;
		if (event.target.textContent === 'Edit') {
			const userInfoName = rootMasterContainer.querySelector('.user-info__name');
			const userInfoJob = rootMasterContainer.querySelector('.user-info__job');

			popUpInputName.value = userInfoName.textContent;
			popUpInputInfo.value = userInfoJob.textContent;
			popUpButton.removeAttribute('disabled');
		}

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
		// Из-за того что контент кнопки "+", его нужно в несколько раз увеличивать
		popUpButton.style.fontSize = `${button.fontSize}px`;
	};

	// Условие: если popup открыт больше не заходить в эти условия
	if (!popUp.classList.contains('popup_is-opened')) {
		// Если нужно отредактировать профиль
		if (event.target.textContent === 'Edit') {

			// Обьект данных для popup edit
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

			// Обьект данных для popup add
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


	// Показываем или скрываем popup
	rootMasterContainer.querySelector('.popup')
		.classList.toggle('popup_is-opened');

	// Условие: если popup открыт больше не заходить в эти условия
	if (!popUp.classList.contains('popup_is-opened')) {
		// Сброс формы
		form.reset();
		popUpButton.setAttribute('disabled', true);

		const popUpErrorName = form.querySelector('.popup__error_name');
		const popUpErrorInfo = form.querySelector('.popup__error_info');
		// Сброс сообщений об ошибках (input)
		if (popUpErrorName.textContent || popUpErrorInfo.textContent) {
			popUpErrorName.textContent = null;
			popUpErrorInfo.textContent = null;
		}
	}

	// Событие клика на кнопку - для закрытия формы
	popupClose.addEventListener('click', popUpForm);
	// Событие ввода в input - для условий формы
	form.addEventListener('input', inputHandler);
	// Событие отправки формы
	form.addEventListener('submit', addList);
};

// Обработчик клика по сердечку
// Удаление карточки
const likeVsRemove = (event) => {
	// Обработчик клика по сердечку
	if (event.target.classList.contains('place-card__like-icon')) {
		event.target.classList.toggle('place-card__like-icon_liked');
	}

	// Удаление карточки
	if (event.target.classList.contains('place-card__delete-icon')) {
		placesList.removeChild(event.target.closest('.place-card'));
	}
};

// Открываем фото или закрываем
// Добавляем конкретное фото
const popUpImg = (event) => {
	const popUp = rootMasterContainer.querySelector('.popup-image');
	const popUpImage = popUp.querySelector('.popup-image__img');

	// Открыть или закрыть фото
	const popUpIsOpened = () => {
		popUp.classList.toggle('popup-image_is-opened');
	};

	if (event.target.classList.contains('place-card__image')) {
		// Подставить конкретное фото
		popUpImage.src = event.target.style.backgroundImage.slice(5, -2);

		// Открыть или закрыть фото
		popUpIsOpened();
	} else if (event.target.classList.contains('popup-image__close')) {
		// Открыть или закрыть фото
		popUpIsOpened();
	}
};

// Обработчик события input
const inputHandler = (event) => {
	const { name, info, submit } = event.currentTarget.elements,
		popUpErrorName = event.currentTarget.querySelector('.popup__error_name'),
		popUpErrorInfo = event.currentTarget.querySelector('.popup__error_info');

	// Блокировка кнопки формы
	const disabledButton = () => {
		submit.setAttribute('disabled', true);
	};

	// Разблокировка кнопки формы
	const noDisabledButton = () => {
		if (info.validity.valid && name.validity.valid) {
			submit.removeAttribute('disabled');
		}
	};

	try {
		if (event.target === name) {
			// Проверка на валидность атрибутам и типу
			if (!name.validity.valid) {
				disabledButton();

				if (name.value.length === 0) {
					popUpErrorName.textContent = 'Это обязательное поле';
				} else if (name.value.length < 2) {
					popUpErrorName.textContent = 'Должно быть от 2 до 30 символов';
				}


			} else {
				popUpErrorName.textContent = null;
				noDisabledButton();
			}
		}
	} catch (error) {
		console.log('Со всеми бывает');
	}

	try {
		if (event.target === info) {
			// Проверка на валидность атрибутам и типу
			if (!info.validity.valid) {
				disabledButton();

				// Если текствое поле (ссылке это сообщение не нужно)
				if (info.type === 'text') {
					if (info.value.length < 2) popUpErrorInfo.textContent = 'Должно быть от 2 до 30 символов';
				}

				// Ссылка ничинаться с https/http
				// Проверяем, содержит ли ссылка протокол
				else if (info.type === 'url') {
					['https', 'http'].forEach(item => {
						if (!info.value.includes(item)) {
							popUpErrorInfo.textContent = 'Ссылка должна начинаться на https/http';
						} else {
							popUpErrorInfo.textContent = null;
						}
					});
				}

				if (info.value.length === 0) popUpErrorInfo.textContent = 'Это обязательное поле';

			} else {
				popUpErrorInfo.textContent = null;
				noDisabledButton();
			}

		}
	} catch (error) {
		console.log('И такое тоже со всеми бывает');
	}
};

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




/**
 * Здравствуйте
 *
 * Правильно что используете event.target
 *
 * Можно лучше. Не обязательно постоянно использовать addEventListener('click' что-бы повесить
 * На один и тот же элемент несколько раз. Достаточно применить один раз и реализовать там весь функционал
 *
 *Можно лучше. То что находится в addEventListener необходимо вынести в отдельный метод класса
 *Вы в будущем можете переиспользовать эти методы по необходимости
 *
 *
 * Можно лучше: обычно названия, для примера 'Должно быть от 2 до 30 символов'
 * выносят в отдельный объект. Допустим может появится задача сделать многоязычный сайт
 * Для примера : const lang = { validationLenght: 'Должно быть от 2 до 30 символов' }
 *
 * Исправить:
 * Зачем Вы используете стрелочные функции, внути стрелочных функций и вообще стрелочные функции.
 * Они будут работать в современных браузерах, но не будут работать в  ES5. Переписать.
 * Вынести функции из функций
 * Сделать более простые функции
 *
 * Такие моменты убрать упростить
 * 	if (info.type === 'text') {
					if (info.value.length < 2) popUpErrorInfo.textContent = 'Должно быть от 2 до 30 символов';
				}

 * Функция const loadedAddList = () => {
	переписать под ES5. а в качестве параметров должен приниматься массив объектов

 *
 * Манипулировать классами стилей а не стилями, здесь только логика
 * 		popUpButton.style.fontSize = `${button.fontSize}px`;
 *
 * В этом месте вы предлагаете не менять имя кнопки, иначе кнопка перестанет работать
 * 		if (event.target.textContent === 'Edit') {
 * Привязать проверку к lassList.contains
 * Это касается здесь
 * 	if (submit.textContent === '+')
 * и здесь
 * (submit.textContent === 'Сохранить')
 *
 * Функцию разбить на много небольших
 * const inputHandler = (event) => {
 * Можно долго отлавливать ошибки если они будут
 *
 *
 *
 * initialCards в отдельный файл, меньше строк, больше понимание,
 * подключить его можно через  <script src="js/initialCards.js"></script>
 *
 * Про создание карточки.
 * Вы можете реализовать функцию, которая сразу же возвращает “кусок” разметки. Это решает проблему постоянного криэйта DOM-элементов.
       cardTemplate() {
           return `<div class="place-card">
                             Здесь вся ваша разметка карточки.
                   </div>`
       };
 * Вы можете реализовать функцию, которая сразу же возвращает “кусок” разметки. Это решает проблему постоянного криэйта DOM-элементов.
       cardTemplate() {
           return `<div class="place-card">
                             Здесь вся ваша разметка карточки.
                   </div>`
       };
 * Обратите внимание на использование backtick ` - это новый нововведение ES6, в нем можно корректно переносить строки и вставлять внутрь разметки JS-код.
 * Конкретнее про вставку JS-кода. Сейчас вы используете способ стандарта ES5 - ' + card.link + ‘. Грузно, не правда ли?
 * В ES6, используя ` бэктик, появляется возможность интерполяции `Строковое значение разметки ${console.log(‘А здесь уже JavaScript’)} `;
 * Обладая данными знаниями, возникает идея оптимизации createCard - теперь эта функция по прежнему принимает card, содержащую нужные параметры, которые
 * непосредственно вставляются в разметку.
       cardTemplate(string) {
           return `<div class="place-card">
                             ${string}
                   </div>`
       };
 *  Этот кусок разметки в дальнейшем можно вставить в DOM, воспользовавшись методом insertAdjacentHTML().
 *  Однако такой способ вставки пользовательских строк является менее безопасным
 *  https://developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentHTML
 *
 * 2. Путь оптимизации уже текущего кода с использованием documentFragment и уменьшении работы над DOM.
 *     https://developer.mozilla.org/ru/docs/Web/API/DocumentFragment - здесь можно почитать о данном методе и его кейсах.
 *     https://developer.mozilla.org/ru/docs/Web/HTML/Element/template - очень интересный тег, его также можно использовать для создание компонентов.
 *
 *
 */