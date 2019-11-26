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