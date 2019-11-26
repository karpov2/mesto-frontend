// Card.js

// _elem - начало наименования переменной/метода с нижнего подчеркивания «_», говорит о том что мы фиксируем ее локально, внутри класса (ее нельзя использовать вне его)

class Card {
	constructor(props) {
        console.log(props);
		this._url = props.link;

		this._element = null;
		this._onClickCallback = props.handleLikeCallback || function() {};
		// this._onClickCallback = null;
		this._remove = this._remove.bind(this);
		this._onClick = this._onClick.bind(this);
	}

	//   handleCardClick(fn) {
	//     this._onClickCallback = fn;
	//   }

	render() {
		this._element = this._createElement(this._template);
		this._setEventListeners();
		return this._element;
	}

	get getSource() {
		return this._element.querySelector('.photo-view__image').src;
	}

	get _template() {
		return `
        <article class='photo-view__item'>
            <img src='${this._url}' class='photo-view__image'>
            <button type='button' class='photo-view__delete'>X</button>
        </article>
        `.trim();
	}

	_createElement(markup) {
		const createNewTag = document.createElement(`div`);
		createNewTag.innerHTML = markup;
		return createNewTag.firstChild;
	}

	_remove() {
		this._removeEventListeners();
		this._element.remove();
	}

	_onClick() {
		return (
			typeof this._onClickCallback === 'function' &&
			this._onClickCallback()
		);
	}

	_setEventListeners() {
		this._element
			.querySelector('.photo-view__delete')
			.addEventListener('click', this._remove);
		this._element
			.querySelector('.photo-view__image')
			.addEventListener('click', this._onClick);
	}

	_removeEventListeners() {
		this._element
			.querySelector('.photo-view__delete')
			.removeEventListener('click', this._remove);
		this._element
			.querySelector('.photo-view__image')
			.removeEventListener('click', this._onClick);
	}
}

// Preview.js

class Preview {
	constructor(props) {
		this._image = document.querySelector('.preview__image');
		this._src = props;
	}

	toggle() {
		document
			.querySelector('.preview')
			.classList.toggle('preview_is-opened');
	}

	changeImage() {
		this._image.src = this._src;
	}
}

// index.js

(function() {
	const root = document.querySelector('.photo-view');
	const initialArray = [
		{
			link:'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
		},
		{
			link:'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
		}
	];

	initialArray.forEach(item => {
		const card = new Card({
			link:'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
			handleLikeCallback: function() {
				const preview = new Preview(card.getSource);
				preview.toggle();
				preview.changeImage();
			}
		});
		// card.handleCardClick(() => {
		//   const preview = new Preview(card.getSource);
		//   preview.toggle();
		//   preview.changeImage();
		// })
		root.appendChild(card.render());
	});
})();
