/*
 * Объявление переменных
 */

// Основной контейнер
const rootMasterContainer = document.querySelector(".root");

// Классы добавил в свойства обьектов - что бы удобно переиспользовать и переопределять

const htmlListCard = {
	container: 'places-list'
};

// Классы html разметки «Карточки»
const htmlCard = {
    image: "place-card__image", // Изображение
    like: "place-card__like-icon", // Лайк
    isLiked: "place-card__like-icon_liked", // Активный лайк
    remove: "place-card__delete-icon", // Кнопка удаление
    container: "place-card" // Родительский контейнер
};

// Классы html разметки «Формы»
const htmlForm = {
    error: {
        // Ошибки валидации
        container: {
            // DOM контейнер ошибок валидации
            name: "popup__error_name",
            info: "popup__error_info"
        },
        text: {
            // Текст ошибок валидации
            valueMissing: "Это обязательное поле",
            tooShort: "Должно быть от 2 до 30 символов",
            typeMismatch: "Введите URL"
        }
    }
};

// Классы html разметки «PopUp»
const htmlPopUp = {
    open: "popup_is-opened", // Display: block, появление (открытие) контейнера
    close: "popup__close" // Закрыть
};

// Профиль: "Имя" и "О себе"
const userProfile = {
	name: 'user-info__name',
	info: 'user-info__job'
};

// Классы html разметки «Редактирование профиля»
const htmlPopUpEdit = {
	addContent: new Profile(userProfile),
    form: "formProfile",
    button: "user-info__edit", // Кнопка открытия формы
    popUp: "popup_edit-profile", // Родительский контейнер
    ...htmlPopUp,
    ...htmlForm
};

// Классы html разметки «Новое место»
const htmlPopUpAdd = {
    addContent: new CardList(htmlListCard),
    form: "formCards",
    button: "user-info__add", // Кнопка открытия формы
    popUp: "popup_add-item", // Родительский контейнер
    ...htmlPopUp,
    ...htmlForm
};

// Классы html разметки «Увеличенного фото карточки»
const htmlPopUpPhoto = {
    popUp: "popup-image", // Родительский контейнер
    img: "popup-image__img", // Изображение
    ...htmlPopUp
};

// Список карточек
// Загрузка карточек при загрузки страницы
const cardList = new CardList(htmlListCard, initialCards);
// Работа с карточкой 
const card = new Card(htmlCard);
// Пупап окна (открытие/закрытие)
const popup = new Popup();
// увеличение фото
const zoomPhoto = new ZoomPhoto(htmlPopUpPhoto);
// Форма редактирования профиля
const formEdit = new Form(htmlPopUpEdit);
// Форма для добавления нового места
const formAdd = new Form(htmlPopUpAdd);
// Валидация формы
const validation = new Validation(htmlForm);

/*
 * Объявление функций
 */

// Обработчик клика по сердечку
// Удаление карточки
const Events = event => {
    // Лайк карточки
    if (event.target.classList.contains(htmlCard.like)) {
        card.like();
    }

    // Удаление карточки
    if (event.target.classList.contains(htmlCard.remove)) {
        card.remove();
    }

    // Увеличиваем (открываем) фото или закрываем
    if (event.target.classList.contains(htmlCard.image)) {
        // Открыть фото
        zoomPhoto.open();
        popup.open(htmlPopUpPhoto);
    } else if (
        event.target.classList.contains(htmlPopUpPhoto.close) &&
        event.target.closest(`.${htmlPopUpPhoto.popUp}`)
    ) {
        // Закрыть фото
        popup.close();
        zoomPhoto.close();
    }

    // Открываем popup форму «Редактирование профиля»
    if (event.target.classList.contains(htmlPopUpEdit.button)) {
        console.log('open event Edit');
        htmlPopUpEdit.addContent.addValue();
        popup.open(htmlPopUpEdit);
        validation.check(formEdit.form);
        formEdit.setAddEventListener();
    } else if (
        event.target.classList.contains(htmlPopUpEdit.close) &&
        event.target.closest(`.${htmlPopUpEdit.popUp}`)
    ) {
		popup.close();
        formEdit.reset();
    }

    // Открываем popup форму «Новое место»
    if (event.target.classList.contains(htmlPopUpAdd.button)) {
        console.log('open event Add');
        popup.open(htmlPopUpAdd);
        formAdd.setAddEventListener();
    } else if (
        event.target.classList.contains(htmlPopUpAdd.close) &&
        event.target.closest(`.${htmlPopUpAdd.popUp}`)
    ) {
        popup.close();
        formAdd.reset();
    }
};

/*
 * Обработчики событий
 */

// Событие загрузки страницы
window.addEventListener("load", cardList.render());
// Событие клика
rootMasterContainer.addEventListener("click", Events);


/*

Илья:
Я разделил все нужные блоки на обьекты
Классы добавил в свойства обьектов - что бы удобно переиспользовать и переопределять

*/

/*
В целом увас очень хорошая работа.
Вы грамотно создаете классы, код логично сгруппирован в методах.
Также вы не создаете ннстансы классов внутри других классов.
Вы удаляете обработчики событий

Нужно исправить:

1. Из критичных ошибок я могу отметить только одну, но крупную проблему - вы не передаете переменные с которыми работаете внутрь классов.
Например в CardList в конструкторе вы пишите следующее this.container = rootMasterContainer.querySelector(`.${dom.container}`);

Но откуда вы взяли rootMasterContainer? Из глобальной области, как только вы перейдете к созданию полноценных модулей вы потеряете
из видимости эту переменную, ее надо передавать в класс. Такое у вас повсеместно, проверьте во всех классах.

2. В классе Validation метод check выглядит избыточным. Разбейте его на несколько методов, которые валидируют соответствующие поля.

Можно лучше:

1. Удаляйте отладчики console.log перед отправкой на проверку
2. Вы не используете наследование классов. Логично было бы наследовать методы close и open из класса Popup в других видах
попапов

 */