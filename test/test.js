function card() {

	// initialCards.js
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
		}
	];

	// Card.js
	class Card {
		constructor(cards) {
			this._name = cards.name;
			this._img = cards.link;
		}

		create() {
			// console.log(this._name);
			// console.log(this._img);
			return `name: ${this._name}`;
		}
	}

	// CardList.js
	class CardList {
		constructor(dom, cards) {
			// Родительский контейнер карточек
			this.$placesList = document.querySelector(dom);
			this.cards = cards;
		}

		render(cardElem) {
			console.log(`dom: ${this.$placesList}`);
			console.log(cardElem.create());
		}
	}

	// index.js
	// Можно обернуть index.js в IIFE
	initialCards.forEach(item => {
		// console.log(item.name);
		const cardList = new CardList('.places-list', item);
		const cardElem = new Card(item);
		cardList.render(cardElem);
	});
}

// card();

class Component {
	constructor(selector) {
		console.log('Component');
		console.log(this);
		this.$el = document.querySelector(selector);
	}

	hide() {
		this.$el.style.display = 'none';
	}
	
	show() {
		this.$el.style.display = 'block';
	}
}

class Box extends Component {
	constructor(options) {
		super(options.selcetor);
	}
}

const box1 = new Box({
	selcetor: 'body',
	size: 100,
	color: 'red'
});