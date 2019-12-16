// Это класс, создающий карточку
class Card {
	constructor(params, api, preloading) {
		this.$like = params.isLiked;
		this.containerParent = document.querySelector(`.${params.list}`);
		this.containerChild = params.card;
		this.image = params.image;
		this.preloading = preloading;
		this.api = api;
	}

	// Лайк карточки
	like() {
		// <button class="place-card__like-icon">
		let likeIcon = event.target;
		console.log(likeIcon.nextElementSibling);
		console.dir(likeIcon.nextElementSibling);
		
		this.api.likeCards(
			'put', 
			likeIcon.closest(`.${this.containerChild}`).getAttribute('id-card')
		)
		.then(like => {
			console.table(like);
			likeIcon.nextElementSibling.textContent = like.likes.length;
			console.log(like.likes.length);
			likeIcon.classList.toggle(this.$like);
		})
		.catch(error => {
			console.log(error);
		});

	}

	// https://cdn.oboi7.com/99f1da545c810446ee53c05d46e695a02a0d6dda/pejzazhi-priroda-hdr-fotografii.jpg

	// Удаление карточки
	remove() {
		// <button class="place-card__delete-icon">
		let deleteIcon = event.target;

		const confirmation = window.confirm('Вы действительно хотите удлаить эту карточку?');
		
		if (confirmation) {
			this.api.deleteCards(deleteIcon.closest(`.${this.containerChild}`).getAttribute('id-card'))
				.then(cards => {
					console.table(cards);
					this.containerParent.removeChild(deleteIcon.closest(`.${this.containerChild}`));
				})
				.catch(err => {
					console.log(err);
				});
		}
	}

	// Он будет создавать DOM-элемент карточки
	create(name, link, likes, _id, userId) {
		// нужно find использовать
		let isLike = likes.forEach(item => {

			console.table(item._id === userId);
		});
		console.table(isLike);
		// Выводим список карточек
		return `
		<div class="place-card" id-card="${_id}">
			<div class="spinner"><i></i></div>
			<div class="place-card__container">
				<button class="place-card__delete-icon" ${userId ? '' : 'hidden'}></button>
				<img class="place-card__image" src="${link}" hidden>
			</div>
			<div class="place-card__description">
				<h3 class="place-card__name">${name}</h3>
				<div class="place-card__like">
					<button class="place-card__like-icon"></button>
					<div class="place-card__like-counter ">${likes.length || 0}</div>
				</div>
			</div>
		</div>
		`.trim();
	}

	// Загрузка картинок после загрузки
	load() {
		// <div class="place-card"></div>
		const card = document.querySelector(`.${this.containerChild}`);
		// <img class="place-card__image" src="">
		const image = document.querySelector(`.${this.image}`);

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

// <img class="place-card__image" src="${link}">
// <div class="place-card__image" style="background-image: url(${link})"></div>