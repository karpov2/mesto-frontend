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