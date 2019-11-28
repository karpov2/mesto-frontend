// Это класс для хранения и отрисовки карточек
class CardList {
	// Метод constructor этого класса должен принимать два параметра:
	// DOM-элемент — контейнер, куда нужно складывать карточки;
	// Массив карточек, которые будут на странице при загрузке.
	constructor(dom, arrayCards) {
		this.container = dom;
		this.card = arrayCards;
		console.log('CardList constructor');
	}

	// addCard для добавления карточки в список
	addCard(name, link) {
		this.container.insertAdjacentHTML('beforeend', card.create(name, link));
	}

	// render для отрисовки карточек при загрузке страницы
	render() {
		this.card.forEach(item => {
			const { name, link } = item;
			// В блок placesList добавляем создданный div placeCard
			this.addCard(name, link);
		});
	}
}