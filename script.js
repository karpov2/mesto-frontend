/*
 * Объявление переменных
 */

// Основной контейнер
const rootMasterContainer = document.querySelector('.root');

// Список карточек
const placesList = rootMasterContainer.querySelector('.places-list');

// Профиль
const userInfoName = rootMasterContainer.querySelector('.user-info__name');
const userInfoJob = rootMasterContainer.querySelector('.user-info__job');

// Подключаемся к кнопке закрытия фото
const popUpImageClose = placesList.querySelector('.popup-image__close');

// Кнопка "+" открытия popup окна
const userInfoAdd = rootMasterContainer.querySelector('.user-info__add');
// Кнопка "Edit" открытия popup окна
const userInfoEdit = rootMasterContainer.querySelector('.user-info__edit');
// Форма
const {formCards, formProfile} = document.forms;

/*
 * Объявление функций
 */

// Добавление карточки в разметку при загрузке страницы
const loadedAddList = (cards) => {
	cards.forEach(item => {
		let { name, link } = item;

		// В блок placesList добавляем создданный div placeCard
		placesList.insertAdjacentHTML('beforeend', createElementsList(name, link));
	});
};

// Создание новых карточек
const createElementsList = (nameValue, infoValue) => {
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
};

// Изменение профиля в разметке "Имя", "О себе"
const createElementsProfile = (nameValue, infoValue) => {
	userInfoName.textContent = nameValue;
	userInfoJob.textContent = infoValue;
};

// Обработка формы профиля
const addProfile = (event) => {
	event.preventDefault();

	// Имя в форме
	let { name, info, submit } = formProfile.elements;

	createElementsProfile(name.value, info.value);

	// Сброс формы
	formProfile.reset();
	// Закрытие popup по срабатыванию
	popUpForm();
	// Снова блокируем кнопку формы
	submit.setAttribute('disabled', true);
};

//Обработка формы добавления нового места
const addList = (event) => {
	event.preventDefault();

	// Имя в форме
	let { name, url, submit } = formCards.elements;

	// В блок placesList добавляем создданный div placeCard
	placesList.insertAdjacentHTML('beforeend', createElementsList(name.value, url.value));

	// Сброс формы
	formCards.reset();
	// Закрытие popup по срабатыванию
	popUpForm();
	// Снова блокируем кнопку формы
	submit.setAttribute('disabled', true);
};

// Открытие и закрытие popup
const popUpForm = (event) => {
	// Крестик - закрытие popup окна
	const popupClose = rootMasterContainer.querySelectorAll('.popup__close');
	
	const popUpIsOpened = (popup) => {
		const popUp = rootMasterContainer.querySelector(popup);
		popUp.classList.toggle('popup_is-opened');
	};
	
	// Если нажали "Редактировать профиль"
	if (event.target.classList.contains('user-info__edit')) {
		popUpIsOpened('.popup_edit-profile');
	} 
	// Если нажали "Дабавить новое место"
	else if (event.target.classList.contains('user-info__add')) {
		popUpIsOpened('.popup_add-item');
		// Событие отправки формы
		formCards.addEventListener('submit', addList);
	} 
	// Если нажали закрыть popup
	else if (event.target.classList.contains('popup__close')) {
		popUpIsOpened('.popup_is-opened');
	}
	// Закрытие после отправки popup
	else if (event.target.classList.contains('button')) {
		popUpIsOpened('.popup_is-opened');
		console.log('Отправил и закрыл');
	}

	// Находим крестик у которого открыт popup
	[...popupClose].some((item, index) => {
		if (item.closest('.popup_is-opened')) {
			// Событие клика на кнопку - для закрытия формы
			popupClose[index].addEventListener('click', popUpForm);
		}
	});
	// Событие ввода в input - для условий формы
	formProfile.addEventListener('input', inputHandler);
	// Событие отправки формы
	formProfile.addEventListener('submit', addList);
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
	const { name, info, submit } = event.currentTarget.elements;
	const popUpErrorName = event.currentTarget.querySelector('.popup__error_name');
	const popUpErrorInfo = event.currentTarget.querySelector('.popup__error_info');

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
window.addEventListener('load', loadedAddList(initialCards));
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
 * Можно лучше. То что находится в addEventListener необходимо вынести в отдельный метод класса
 * Вы в будущем можете переиспользовать эти методы по необходимости
 * Имеется ввиду, что код из коллбэк функции addEventListener лучше вынести в отдельную функцию, чтобы это можно было переиспользовать
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