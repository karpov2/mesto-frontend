class Form {
    constructor() {
        this.form = params;
    }

    inputHandler() {
        const { name, info, submit } = event.currentTarget.elements;
        const popUpErrorName = event.currentTarget.querySelector(
            '.popup__error_name'
        );
        const popUpErrorInfo = event.currentTarget.querySelector(
            '.popup__error_info'
        );

        if (event.target === name) {
            if (name.validity.valueMissing) {
                popUpErrorName.textContent = lang.valueMissing;
            } else if (name.validity.tooShort) {
                popUpErrorName.textContent = lang.tooShort;
            } else {
                popUpErrorName.textContent = null;
            }
        }

        if (event.target === info) {
            if (info.validity.valueMissing) {
                popUpErrorInfo.textContent = lang.valueMissing;
            } else if (info.validity.tooShort) {
                popUpErrorInfo.textContent = lang.tooShort;
            } else if (info.validity.typeMismatch) {
                popUpErrorInfo.textContent = lang.typeMismatch;
            } else {
                popUpErrorInfo.textContent = null;
            }
        }

        // Разблокировка кнопки формы
        if (name.validity.valid && info.validity.valid) {
            submit.removeAttribute('disabled');
        } else {
            // Блокировка кнопки формы
            submit.setAttribute('disabled', true);
        }
    }

    add() {

    }

    reset() {

    }
}