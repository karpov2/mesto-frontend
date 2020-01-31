// Это класс для хранения и отрисовки карточек
export class CardList {
	// Метод constructor этого класса должен принимать два параметра:
	// DOM-элемент — контейнер, куда нужно складывать карточки;
	// Массив карточек, которые будут на странице при загрузке.
	constructor(dom, api, classCard, user) {
		this.container = document.querySelector(`.${dom.list}`);
		// Можно лучше: Имя card не отражает сущности хранимых данных
		this.api = api;
		this.card = classCard;
		this.userId = user;
	}

	get(name, link) {
		this.api.postCards({
			name: name,
			link: link
		})
		.then(post => {
			console.table(post);
			const { name, link, likes, _id, owner } = post;
			this.add(name, link, likes, _id, owner);
		});
	}

	// addCard для добавления карточки в список
	add(name, link, likes, id, owner) {
		this.container.insertAdjacentHTML(
			'afterbegin', 
			this.card.create({
				name, 
				link, 
				likes, 
				id, 
				owner: owner._id === this.userId._id
			})
		);
		
		this.card.load();
		this.card.checkLike({likes, userId: this.userId});
	}

	// render для отрисовки карточек при загрузке страницы
	render() {
		this.api.getCards()
			.then(cards => {
				const data = cards.reduce((value, item) => {
                    
                    if (item.owner._id === this.userId._id) {
                        value.push(item);
                    }

                    if (value.length < 9) {
                        value.unshift(item);
                    }

                    return value;
                }, []);
				// console.table(data);
				
				data.forEach(item => {
					const { name, link, likes, _id, owner } = item;
					// В блок placesList добавляем создданный div placeCard
					this.add(name, link, likes, _id, owner);
				});
			});
	}
}