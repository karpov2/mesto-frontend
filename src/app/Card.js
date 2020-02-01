// Это класс, создающий карточку
export class Card {
	constructor(params, api, preloading) {
		this.containerParent = document.querySelector(`.${params.list}`);
		this.card = params;
		this.preloading = preloading;
		this.api = api;
	}

	// Лайк карточки
	like() {
		// <button class="place-card__like-icon">
		let likeIcon = event.target;

		this.api.likeCards(
			likeIcon.classList.contains(this.card.isLiked) ? 'delete':'put', 
			likeIcon.closest(`.${this.card.card}`).getAttribute('id-card')
		)
		.then(like => {
			likeIcon.nextElementSibling.textContent = like.likes.length;
			likeIcon.classList.toggle(this.card.isLiked);
		})
		.catch(error => {
			console.log(error);
		});
	}

	checkLike(params) {
		const _likes = params.likes;
		const _userId = params.userId;

		_likes.some(item => {
			if (item._id === _userId._id) {
				document.querySelector(`.${this.card.like}`).classList.add(`${this.card.isLiked}`);
			}
		});
	}

	// Удаление карточки
	remove() {
		// <button class="place-card__delete-icon">
		let deleteIcon = event.target;

		const confirmation = window.confirm('Вы действительно хотите удлаить эту карточку?');
		
		if (confirmation) {
			this.api.deleteCards(deleteIcon.closest(`.${this.card.card}`).getAttribute('id-card'))
				.then(cards => {
					console.table(cards);
					this.containerParent.removeChild(deleteIcon.closest(`.${this.card.card}`));
				})
				.catch(err => {
					console.log(err);
				});
		}
	}

	// Он будет создавать DOM-элемент карточки
	create(params) {
		const _name = params.name;
		const _link = params.link;
		const _likes = params.likes;
		const _id = params.id;
		const _userId = params.owner;

		// Выводим список карточек
		return `
		<div class="place-card" id-card="${_id}">
			<div class="spinner"><i></i></div>
			<div class="place-card__container">
				<button class="place-card__delete-icon" ${_userId ? '' : 'hidden'}></button>
				<img class="place-card__image" src="${_link}" hidden>
			</div>
			<div class="place-card__description">
				<h3 class="place-card__name">${_name}</h3>
				<div class="place-card__like">
					<button class="place-card__like-icon"></button>
					<div class="place-card__like-counter ">${_likes.length || 0}</div>
				</div>
			</div>
		</div>
		`.trim();
	}

	// Загрузка картинок после загрузки
	load() {
		// <div class="place-card"></div>
		const card = document.querySelector(`.${this.card.card}`);
		// <img class="place-card__image" src="">
		const image = document.querySelector(`.${this.card.image}`);

		this.preloading.load(card);

		image.onerror = () => {
			console.dir(image);
		};

		image.onload = () => {
			this.preloading.load(card);
			image.hidden = false;
		};
	}
}