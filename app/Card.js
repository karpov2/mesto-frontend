// Это класс, создающий карточку
class Card {
	constructor(params) {
		this.$like = params.isLiked;
		this.containerParent = document.querySelector(`.${params.list}`);
		this.containerChild = params.card;
		this.image = params.image;
	}

	// Лайк карточки
	like() {
		event.target.classList.toggle(this.$like);
	}

	// Удаление карточки
	remove() {
		this.containerParent.removeChild(event.target.closest(`.${this.containerChild}`));
	}

	// Он будет создавать DOM-элемент карточки
	create(name, link, likes) {
		// Выводим список карточек
		return `
		<div class="place-card">
			<div class="spinner"><i></i></div>
			<div class="place-card__container">
				<button class="place-card__delete-icon hidden"></button>
				<img class="place-card__image" src="${link}" hidden>
			</div>
			<div class="place-card__description">
				<h3 class="place-card__name">${name}</h3>
				<div class="place-card__like">
					<button class="place-card__like-icon"></button>
					<div class="place-card__like-counter">${likes.length + 1}</div>
				</div>
			</div>
		</div>
		`.trim();
	}
}

// <img class="place-card__image" src="${link}">
// <div class="place-card__image" style="background-image: url(${link})"></div>