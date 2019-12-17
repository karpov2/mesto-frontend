class Validation {
    constructor(params) {
        // Подключаемся к полям вывода текста ошибок
        this.errorContainerName = params.error.container.name;
        this.errorContainerInfo = params.error.container.info;

        // Ошибки валидации
        this.valueMissing = params.error.text.valueMissing;
        this.tooShort = params.error.text.tooShort;
        this.typeMismatch = params.error.text.typeMismatch;
    }

    check(classForm) {
        // Подключаемся к полям вывода текста ошибок
        this.errorName = classForm.querySelector(
            `.${this.errorContainerName}`
        );
        this.errorInfo = classForm.querySelector(
            `.${this.errorContainerInfo}`
        );

        this.name = classForm.elements.name;
        this.info = classForm.elements.info;
        this.submit = classForm.elements.submit;

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
            return;
        }
        if (input.validity.tooShort) {
            error.textContent = this.tooShort;
            return;
        }
        if (input.validity.typeMismatch) {
            error.textContent = this.typeMismatch;
            return;
        }
        error.textContent = null;
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