// Это класс для хранения и отрисовки карточек
class CardList {
	// Метод constructor этого класса должен принимать два параметра:
	// DOM-элемент — контейнер, куда нужно складывать карточки;
	// Массив карточек, которые будут на странице при загрузке.
	constructor(dom, arrayCards) {
		this.container = rootMasterContainer.querySelector(`.${dom.container}`);
		// Можно лучше: Имя card не отражает сущности хранимых данных
		this.card = arrayCards;
		
		console.log('class CardList');
	}

	// addCard для добавления карточки в список
	add(name, link) {
		this.container.insertAdjacentHTML('beforeend', card.create(name, link));
	}

	// render для отрисовки карточек при загрузке страницы
	render() {
		this.card.forEach(item => {
			const { name, link } = item;
			// В блок placesList добавляем создданный div placeCard
			this.add(name, link);
		});
	}
}
