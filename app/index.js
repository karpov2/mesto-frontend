/*
 * Подключение модулей
 */

// Список карточек
// Загрузка карточек при загрузки страницы
const cardList = new CardList(htmlListCard, initialCards);
// Работа с карточкой 
const card = new Card(htmlCard);
// увеличение фото
const zoomPhoto = new ZoomPhoto(htmlPopUpPhoto);
// Форма редактирования профиля
const formEdit = new Form(htmlPopUpEdit);
// Форма для добавления нового места
const formAdd = new Form(htmlPopUpAdd);
// Валидация формы
const validation = new Validation(htmlForm);

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

-------------

1. Из критичных ошибок я могу отметить только одну, но крупную проблему - вы не передаете переменные с которыми работаете внутрь классов.
Например в CardList в конструкторе вы пишите следующее this.container = rootMasterContainer.querySelector(`.${dom.container}`);

Но откуда вы взяли rootMasterContainer? Из глобальной области, как только вы перейдете к созданию полноценных модулей вы потеряете
из видимости эту переменную, ее надо передавать в класс. Такое у вас повсеместно, проверьте во всех классах.

Илья: исправил, сделал так:
Создал обьект "rootContainer" в него положил подключение "document.querySelector('.root')"
Почему сделал так: что бы в других классах где я использую "rootContainer" мне не приходилось дублировать код и не было повторных погружений до класса ".root"
Если я в каждом классе создам свое подключение "document.querySelector('.root')" - каждый раз будет заново погружать от window до класса ".root", верно?

Я правильно рассуждаю?
Или нужно в каждом классе (CardList, Popup...) создавать своё (новое/дублировать) подключение? "document.querySelector('.root')"

-------------

2. В классе Validation метод check выглядит избыточным. Разбейте его на несколько методов, которые валидируют соответствующие поля.

Илья: исправил, разделил все на методы

-------------

Можно лучше:

1. Удаляйте отладчики console.log перед отправкой на проверку
2. Вы не используете наследование классов. Логично было бы наследовать методы close и open из класса Popup в других видах
попапов

Илья: сделал наследование

 */