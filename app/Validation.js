class Validation {
    constructor(params) {
        this.name = null;
        this.info = null;
        this.submit = null;

        // Подключаемся к полям вывода текста ошибок
        this.errorContainerName = params.error.container.name;
        this.errorContainerInfo = params.error.container.info;

        // Ошибки валидации
        this.valueMissing = params.error.text.valueMissing;
        this.tooShort = params.error.text.tooShort;
        this.typeMismatch = params.error.text.typeMismatch;
    }

    check(form) {
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

        this.checkName(this.name, this.errorName);
        this.checkInfo(this.info, this.errorInfo);
        
        this.valid(this.name, this.info, this.submit);
    }

    checkName(name, error) {
        if (event.target === name) {
            this.error(name, error);
        }
    }

    checkInfo(info, error) {
        if (event.target === info) {
            this.error(info, error);
        }
    }

    // Нужно исправить: Удалите неиспользуемый метод
    error(input, error) {
        if (input.validity.valueMissing) {
            error.textContent = this.valueMissing;
        } else if (input.validity.tooShort) {
            error.textContent = this.tooShort;
        } else if (input.validity.typeMismatch) {
            error.textContent = this.typeMismatch;
        } else {
            error.textContent = null;
        }
    }

    valid(name, info, submit) {
        // Разблокировка кнопки формы
        if (name.validity.valid && info.validity.valid) {
            submit.removeAttribute("disabled");
        } else {
            // Блокировка кнопки формы
            submit.setAttribute("disabled", true);
        }
    }
}