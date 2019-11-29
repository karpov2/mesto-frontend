class Form {
    constructor(params) {
        // Элементы формы
        this.form = document.forms[params.form];
        this.name = this.form.elements.name;
        this.info = this.form.elements.info;
        this.submit = this.form.elements.submit;

        this.errorName = params.error.container.name;
        this.errorInfo = params.error.container.info;

        this.valueMissing = params.error.text.valueMissing;
        this.tooShort = params.error.text.tooShort;
        this.typeMismatch = params.error.text.tooShort;
    }

    // Добавление обработчиков событий
    setAddEventListener() {
		this.form.addEventListener('input', this.inputHandler);
		this.form.addEventListener('submit', this.inputHandler);
    }

    // Удаление обработчиков событий
    removeAddEventListener() {
		this.form.removeEventListener('input', this.inputHandler);
		this.form.removeEventListener('submit', this.inputHandler);
    }

    error() {
        console.log(this);
    }

    // убрать контекст вызова addEventListener, переделать все на контекст класса Form
    inputHandler() {
        const errorName = event.currentTarget.querySelector(this.errorName);
        const errorInfo = event.currentTarget.querySelector(this.errorInfo);
        console.log(errorName);

        if (event.target === this.name) {
            if (this.name.validity.valueMissing) {
                errorName.textContent = this.valueMissing;
            } else if (this.name.validity.tooShort) {
                errorName.textContent = this.tooShort;
            } else {
                errorName.textContent = null;
            }
        }

        if (event.target === this.info) {
            if (this.info.validity.valueMissing) {
                errorInfo.textContent = this.valueMissing;
            } else if (this.info.validity.tooShort) {
                errorInfo.textContent = this.tooShort;
            } else if (this.info.validity.typeMismatch) {
                errorInfo.textContent = this.typeMismatch;
            } else {
                errorInfo.textContent = null;
            }
        }

        // Разблокировка кнопки формы
        if (this.name.validity.valid && this.info.validity.valid) {
            this.submit.removeAttribute('disabled');
        } else {
            // Блокировка кнопки формы
            this.submit.setAttribute('disabled', true);
        }
    }

    add() {
        event.preventDefault();

        // В блок placesList добавляем создданный div place-card
        placesList.insertAdjacentHTML(
            'beforeend',
            createElementsList(name.value, info.value)
        );  
    }

    reset() {
        // Сброс формы
        this.form.reset();
        // Снова блокируем кнопку формы
        this.submit.setAttribute('disabled', true);
        // Удаление обработчиков событий
        this.removeAddEventListener();
    }
}