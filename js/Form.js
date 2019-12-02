class Form {
    constructor(params) {
        console.log('class Form');
        // Элементы формы
        this.form = document.forms[params.form];
        this.name = this.form.elements.name;
        this.info = this.form.elements.info;
        this.submit = this.form.elements.submit;

        // Добавление контента на страницу
        this.addContent = params.addContent;

        // Сохранение контекста класса Form для метода add
        this._add = this.add.bind(this);
    }

    // Добавление обработчиков событий
    setAddEventListener() {
        console.log('class Form -- metod: setAddEventListener');
        this.form.addEventListener(
            'input',
            this._form
        );
        this.form.addEventListener(
            'submit',
            this._add
        );
    }

    // Удаление обработчиков событий
    removeAddEventListener() {
        console.log('class Form -- metod: removeAddEventListener');
        this.form.removeEventListener(
            'input',
            validation.check
        );
        this.form.removeEventListener(
            'submit',
            this._add
        );
    }

    _form() {
        console.log(this);
        validation.check(this); 
    }

    add() {
        console.log('class Form -- metod: add');
        console.log(this);
        event.preventDefault();

        console.log(this.addContent);

        this.addContent.add(this.name.value, this.info.value);
        
        this.reset();
    }

    value(name, info) {
        console.log('class Form -- metod: value');
        this.name.value = name;
        this.info.value = info;
    }

    reset() {
        console.log('class Form -- metod: reset');
        // Сброс формы
        this.form.reset();
        // Снова блокируем кнопку формы
        this.submit.setAttribute('disabled', true);
        // Удаление обработчиков событий
        this.removeAddEventListener();
        popup.close();
    }
}
