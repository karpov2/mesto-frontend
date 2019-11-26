// Список карточек
const placesList = document.querySelector('.places-list');

// initialCards.js
const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	}
];

// Card.js
class Card {
	constructor(props) {
		this._name = props.name;
		this._img = props.img;
	}

	create() {
        return `name: ${this._name}, link: ${this._img}`;
    }
}

// CardList.js
class CardList {
	constructor(dom, cards) {
		this._dom = dom;
		this.cards = cards;
	}

	render() {
        const {cardElem} = new Card();

        console.log(`dom: ${this._dom}`);
        console.log(`dom: ${this.cards}`);
        console.log(create(name, link));
	}
}

// index.js
initialCards.forEach(item => {
	const cardList = new CardList();
});
