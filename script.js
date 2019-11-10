/*
 * Объявление переменных
 */

// Основной контейнер
const rootMasterContainer = document.querySelector('.root'),
	// Список карточек
	placesList = rootMasterContainer.querySelector('.places-list'),
	// Кнопка "+" открытия popup окна
	infoButton = rootMasterContainer.querySelector('.user-info__button'),
	// Крестик - закрытие popup окна
	popupClose = rootMasterContainer.querySelector('.popup__close'),
	// Форма
	form = document.forms.new;

const initialCards = [
	{
		name: 'Архыз',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	},
	{
		name: 'Нургуш',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
	},
	{
		name: 'Тулиновка',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
	},
	{
		name: 'Остров Желтухина',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
	},
	{
		name: 'Владивосток',
		link:
			'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
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
function createElementsList(nameValue, imgLink) {
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
	placeCardImage.style.backgroundImage = `url(${imgLink})`;
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
	let cardName = form.elements.name,
		// Ссылка на картинку в форме
		cardImage = form.elements.link;

	// В блок placesList добавляем создданный div placeCard
	placesList.appendChild(createElementsList(cardName.value, cardImage.value));

	// Сброс формы
	form.reset();
	// Закрытие popup по срабатыванию
	popUpForm();
	// Снова блокируем кнопку формы
	form.elements.submit.setAttribute('disabled', true);
}

// Открытие и закрытие popup
function popUpForm() {
	rootMasterContainer
		.querySelector('.popup')
		.classList.toggle('popup_is-opened');
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
	const popupName = event.currentTarget.elements.name,
		  popupLink = event.currentTarget.elements.link,
		  popupButton = event.currentTarget.elements.submit,
		  errorName = event.currentTarget.querySelector('.error');

    // Условие блокировки кнопки формы
    // Если поля пустые
	if (popupName.value.lenght === 0 || popupLink.value.lenght === 0) {
        popupButton.setAttribute('disabled', true);
        // popupName.setCustomValidity('Пустое поле');
	} else {
        popupButton.removeAttribute('disabled');
        // popupName.setCustomValidity('');
    }

    const specialSymbol = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '/', '§'];
    // Имя содержит только буквы
    // Проверяем, была ли введена цифра
    // Регулярные выражения еще не знаю
    // popupName.value.split('').forEach(function(item) {
    //     if (!Number.isNaN(+item) || specialSymbol.includes(item)) {
    //         popupButton.setAttribute('disabled', true);
    //         popupName.setCustomValidity('Название не должно содержать цифр или спец. символов');
    //     } else {
    //         popupButton.removeAttribute('disabled');
    //         popupName.setCustomValidity('');
    //     }
    // });
    if (!popupName.validity.valid) {
		popupButton.setAttribute('disabled', true);
		errorName.textContent = 'popupName.validationMessage';
		// popupName.setCustomValidity('Название не должно содержать цифр или спец. символов');
	} else {
		popupButton.removeAttribute('disabled');
		errorName.textContent = '1';
		// popupName.setCustomValidity('');
	}

    const linkProtocol = ['https', 'http'];
    // Ссылка ничинаться с https/http
    // Проверяем, содержит ли ссылка протокол
    // Регулярные выражения еще не знаю
    linkProtocol.forEach(function(item) {
        if (!popupLink.value.includes(item)) {
            popupButton.setAttribute('disabled', true);
            popupLink.setCustomValidity('Ссылка должна ничинаться с https/http');
        } else {
            popupButton.removeAttribute('disabled');
            popupLink.setCustomValidity('');
        }
    });
}

/*
 * Обработчики событий
 */

// Событие загрузки страницы
window.addEventListener('load', loadedAddList);
// Событие клика на кнопку "+" - для открытия формы
infoButton.addEventListener('click', popUpForm);
// Событие клика на кнопку - для закрытия формы
popupClose.addEventListener('click', popUpForm);
// Событие клика на кнопку - like
placesList.addEventListener('click', likeVsRemove);
// Событие ввода в input - для условий формы
form.addEventListener('input', inputHandler);
// Событие отправки формы
form.addEventListener('submit', addList);