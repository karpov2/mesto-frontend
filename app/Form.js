class Form extends Popup {
    constructor() {
        super();
        // Сохранение контекста класса Form для метода add
        this._add = this.add.bind(this);
        this._valid = this.valid.bind(this);
    }

    // Изменяемые данные для каждой формы
    formData(params, validation, classContent) {
        // Элементы формы
        this.form = document.forms[params.form];
        this.name = this.form.elements.name;
        this.info = this.form.elements.info;
        this.submit = this.form.elements.submit;
        // Добавление контента на страницу
        this.addContent = classContent;
        // Класс валидации
        this.validation = validation;
    }

    // Добавление обработчиков событий
    setAddEventListener() {
        this.form.addEventListener(
            'input',
            this._valid
        );

        this.form.addEventListener(
            'submit',
            this._add
        );
    }

    // Удаление обработчиков событий
    removeAddEventListener() {
        this.form.removeEventListener(
            'input',
            validation.check
        );

        this.form.removeEventListener(
            'submit',
            this._add
        );
    }

    valid() {
        // console.log(this);
        this.validation.check(this.form);
    }

    add() {
        event.preventDefault();
        this.addContent.get(this.name.value, this.info.value);
        this.reset();
    }

    value(name, info) {
        this.name.value = name;
        this.info.value = info;
    }

    reset() {
        // Сброс формы
        this.form.reset();
        // Снова блокируем кнопку формы
        this.submit.setAttribute('disabled', true);
        // Удаление обработчиков событий
        this.removeAddEventListener();
        this.close();
    }
}
