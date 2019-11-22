/* Объявления классов */

class Song {
	constructor(title, artist) {
		this.songElement = this.createSong(title, artist);
		this.songElement
			.querySelector('.song__like')
			.addEventListener('click', this.like);
	}

	createSong(titleValue, artistValue) {
		const trackContainer = document.createElement('div');
		const artistElement = document.createElement('h4');
		const titleElement = document.createElement('p');
		const songButtonElement = document.createElement('button');

		trackContainer.classList.add('song');
		artistElement.classList.add('song__artist');
		artistElement.textContent = artistValue;
		titleElement.classList.add('song__title');
		titleElement.textContent = titleValue;
		songButtonElement.classList.add('song__like');

		trackContainer.appendChild(artistElement);
		trackContainer.appendChild(titleElement);
		trackContainer.appendChild(songButtonElement);

		return trackContainer;
	}

	like(event) {
		event.target.classList.toggle('song__like_active');
	}
}

class Playlist {
	constructor(container) {
		this.container = container;
		this.songs = [];
		this.render();
	}

	render() {
		const noSongsElement = document.querySelector('.no-songs');

		if (this.songs.length === 0) {
			noSongsElement.classList.remove('no-songs_hidden');
		} else {
			noSongsElement.classList.add('no-songs_hidden');
		}
	}

	addSong(title, artist) {
		const { songElement } = new Song(title, artist);

		this.songs.push(songElement);
		this.container.appendChild(songElement);
		this.render();
	}

	reset() {
		this.songs = [];
		this.container.innerHTML = '';
		this.render();
	}
}

/* Переменные */

const resetButton = document.querySelector('.input__btn_reset');
const form = document.forms.add;
const playlist = new Playlist(document.querySelector('.songs-container'));

/* Слушатели событий */

form.addEventListener('submit', function(event) {
	event.preventDefault();

	playlist.addSong(form.elements.title.value, form.elements.artist.value);

	form.reset();
});

resetButton.addEventListener('click', function() {
	playlist.reset();
});
