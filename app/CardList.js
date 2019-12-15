// Это класс для хранения и отрисовки карточек
class CardList {
	// Метод constructor этого класса должен принимать два параметра:
	// DOM-элемент — контейнер, куда нужно складывать карточки;
	// Массив карточек, которые будут на странице при загрузке.
	constructor(dom, api, classCard, preloading) {
		this.container = document.querySelector(`.${dom.list}`);
		// Можно лучше: Имя card не отражает сущности хранимых данных
		this.cards = api;
		this.card = classCard;
		this.preloading = preloading;
	}

	get(name, link) {
		this.cards.postCards({
			name: name,
			link: link
		})
		.then(post => {
			const { name, link } = post;
			this.add(name, link);
		});
	}

	// addCard для добавления карточки в список
	add(name, link, likes, _id) {
		this.container.insertAdjacentHTML(
			'beforeend', 
			this.card.create(name, link, likes)
		);

		this.load();
	}

	// Загрузка картинок после загрузки
	load() {
		let counter = document.querySelectorAll(`.${this.card.containerChild}`).length - 1;

		// <div class="place-card"></div>
		const card = document.querySelectorAll(`.${this.card.containerChild}`)[counter];
		// <img class="place-card__image" src="">
		const image = document.querySelectorAll(`.${this.card.image}`)[counter];
		
		this.preloading.load(card);

		image.onload = () => {
			this.preloading.load(card);
			image.hidden = false;
		}
	}

	// render для отрисовки карточек при загрузке страницы
	render() {
		this.cards.getCards()
			.then(data => {
				console.table(data);
				data.forEach(item => {
					const { name, link, likes, _id } = item;
					// В блок placesList добавляем создданный div placeCard
					this.add(name, link, likes, _id);
				});
			});
	}
}