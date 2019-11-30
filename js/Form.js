class Form {
    constructor(params) {
        // Элементы формы
        this.form = document.forms[params.form];
        this.name = this.form.elements.name;
        this.info = this.form.elements.info;
        this.submit = this.form.elements.submit;

        // Подключаемся к полям вывода текста ошибок
        this.errorName = this.form.querySelector(
            `.${params.error.container.name}`
        );
        this.errorInfo = this.form.querySelector(
            `.${params.error.container.info}`
        );

        // Ошибки валидации
        this.valueMissing = params.error.text.valueMissing;
        this.tooShort = params.error.text.tooShort;
        this.typeMismatch = params.error.text.tooShort;
    }

    // Добавление обработчиков событий
    setAddEventListener() {
        console.log(this);
        this.form.addEventListener(
            "input",
            this.inputHandler.bind(this)
        );
        this.form.addEventListener(
            "submit",
            this.inputHandler.bind(this)
        );
    }

    // Удаление обработчиков событий
    removeAddEventListener() {
        this.form.removeEventListener(
            "input",
            this.inputHandler.bind(this)
        );
        this.form.removeEventListener(
            "submit",
            this.inputHandler.bind(this)
        );
    }

    // Валидация input и вывод текстов ошибок
    inputHandler() {
        console.log(this);

        //
        if (event.target === this.name) {
            if (this.name.validity.valueMissing) {
                this.errorName.textContent = this.valueMissing;
            } else if (this.name.validity.tooShort) {
                this.errorName.textContent = this.tooShort;
            } else {
                this.errorName.textContent = null;
            }
        }

        if (event.target === this.info) {
            if (this.info.validity.valueMissing) {
                this.errorInfo.textContent = this.valueMissing;
            } else if (this.info.validity.tooShort) {
                this.errorInfo.textContent = this.tooShort;
            } else if (this.info.validity.typeMismatch) {
                this.errorInfo.textContent = this.typeMismatch;
            } else {
                this.errorInfo.textContent = null;
            }
        }

        // Разблокировка кнопки формы
        if (this.name.validity.valid && this.info.validity.valid) {
            this.submit.removeAttribute("disabled");
            this.add();
        } else {
            // Блокировка кнопки формы
            this.submit.setAttribute("disabled", true);
        }
    }

    add() {
        event.preventDefault();

        // В блок placesList добавляем создданный div place-card
        // cardList.container.insertAdjacentHTML(
        //     "beforeend",
        //     createElementsList(this.name.value, this.info.value)
        // );

        
    }

    reset() {
        // Сброс формы
        this.form.reset();
        // Снова блокируем кнопку формы
        this.submit.setAttribute("disabled", true);
        // Удаление обработчиков событий
        this.removeAddEventListener();
    }
}
