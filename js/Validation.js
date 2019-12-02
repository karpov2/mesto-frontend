class Validation {
    constructor(params) {
        console.log('class Validation');
        this.name = null;
        this.info = null;
        this.submit = null;

        // Подключаемся к полям вывода текста ошибок
        this.errorContainerName = params.error.container.name;
        this.errorContainerInfo = params.error.container.info;

        // Ошибки валидации
        this.valueMissing = params.error.text.valueMissing;
        this.tooShort = params.error.text.tooShort;
        this.typeMismatch = params.error.text.tooShort;
    }

    check(form) {
        console.log('class Validation -- metod: check');
        console.log(this);
        console.log(event.target);

        console.log(form);
        // Подключаемся к полям вывода текста ошибок
        this.errorName = form.querySelector(
            `.${this.errorContainerName}`
        );
        this.errorInfo = form.querySelector(
            `.${this.errorContainerInfo}`
        );

        this.name = form.elements.name;
        this.info = form.elements.info;
        this.submit = form.elements.submit;

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
        } else {
            // Блокировка кнопки формы
            this.submit.setAttribute("disabled", true);
        }
    }

    error() {

    }
}