document.querySelector('.test').addEventListener("click", events);

function events(event) {
	if (event.target.classList.contains('test')) {
		console.log('open event click');
		form.setAddEventListener();
	}
};

class Form {
	constructor() {
		console.log('class Form');
		this.counter = 0;
	}

  	setAddEventListener() {
		console.log('class Form -- metod: setAddEventListener');
		document.querySelector('.test__input').addEventListener("input", this.add.bind(this));
	}

	removeAddEventListener() {
		console.log('class Form -- metod: removeAddEventListener');
		document.querySelector('.test__input').removeEventListener("input", this.add);
	}

	add() {
		console.log('class Form -- metod: add');
		console.log(this.counter += 1);
		this.reset();
	}

	reset() {
		console.log('class Form -- metod: reset');
		this.removeAddEventListener();
	}
}

const form = new Form();