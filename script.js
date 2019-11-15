/*
 * Объявление переменных
 */

// Основной контейнер
const rootMasterContainer = document.querySelector('.root');

// Список карточек
const placesList = rootMasterContainer.querySelector('.places-list');

// Всплывающее фото
const popUpImage = rootMasterContainer.querySelector('.popup-image');
const popUpAddImage = popUpImage.querySelector('.popup-image__img');
const popUpImageClose = popUpImage.querySelector('.popup-image__close');

// Кнопка "Edit" открытия popup окна
const userInfoEdit = rootMasterContainer.querySelector('.user-info__edit');
// Форма для редактирования профиля
const popUpProfileItem = rootMasterContainer.querySelector('.popup_edit-profile');
const popUpProfileClose = popUpProfileItem.querySelector('.popup__close');
// const popUpProfileButton = popUpProfileItem.querySelector('.popup__button');
// Профиль: "Имя" и "О себе"
const userInfoName = rootMasterContainer.querySelector('.user-info__name');
const userInfoJob = rootMasterContainer.querySelector('.user-info__job');

// Кнопка "+" открытия popup окна
const userInfoAdd = rootMasterContainer.querySelector('.user-info__add');
// Форма для добавления нового места
const popUpAddItem = rootMasterContainer.querySelector('.popup_add-item');
const popUpAddClose = popUpAddItem.querySelector('.popup__close');
// const popUpAddButton = popUpAddItem.querySelector('.popup__button');

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

	// Элементы формы
	let { name, info, submit } = formProfile.elements;

	createElementsProfile(name.value, info.value);

	// Сброс формы
	formProfile.reset();
	// Закрытие popup по срабатыванию
	openPopUpFormProfile();
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
	openPopUpFormCards();
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
	const { name, info, submit} = formProfile.elements;
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
	// Открыть или закрыть фото
	const popUpIsOpened = () => {
		popUpImage.classList.toggle('popup-image_is-opened');
	};

	if (event.target.classList.contains('place-card__image')) {
		// Подставить конкретное фото
		popUpAddImage.src = event.target.style.backgroundImage.slice(5, -2);

		// Открыть фото
		popUpIsOpened();
	} else if (event.target === popUpImageClose) {
		// Закрыть фото
		popUpIsOpened();
	}
};

// Обработчик события input
const inputHandler = (event) => {
	const { name, info, submit } = event.currentTarget.elements;
	const popUpErrorName = event.currentTarget.querySelector('.popup__error_name');
	const popUpErrorInfo = event.currentTarget.querySelector('.popup__error_info');
	
	const lang = {
		valueMissing: 'Это обязательное поле',
		tooShort: 'Должно быть от 2 до 30 символов',
		typeMismatch: 'Введите URL'
	};

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
		} else if(info.validity.typeMismatch) {
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
window.addEventListener('load', loadedAddList(initialCards));
// Событие клика на кнопку "+" - для открытия формы
userInfoAdd.addEventListener('click', openPopUpFormCards);
// Событие клика на кнопку "Edit" - для открытия формы
userInfoEdit.addEventListener('click', openPopUpFormProfile);
// Событие клика на кнопку - like
placesList.addEventListener('click', likeVsRemove);
// Событие клика по фото
placesList.addEventListener('click', popUpImg);
popUpImageClose.addEventListener('click', popUpImg);




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
 * Илья: исправил
 */