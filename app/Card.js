// Это класс, создающий карточку
class Card {
	constructor(params) {
		this.$like = params.isLiked;
		this.containerParent = params['root container'].querySelector(`.${params.list}`);
		this.containerChild = params.card;
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
	create(name, link) {
		// Выводим список карточек
		return `
		<div class="place-card">
			<div class="place-card__image" style="background-image: url(${link});">
				<button class="place-card__delete-icon"></button>
			</div>
			<div class="place-card__description">
				<h3 class="place-card__name">${name}</h3>
				<div class="place-card__like">
					<button class="place-card__like-icon"></button>
					<div class="place-card__like-counter">0</div>
				</div>
			</div>
		</div>
		`.trim();
	}
}
