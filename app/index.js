/*
 * Подключение модулей
 */

//  Подключение API
const api = new Api(connectionApi);
// Предварительная загрузка
const preloading = new Preloading(htmlPreloading);
// Работа с карточкой 
const card = new Card(htmlCard);
// Список карточек
// Загрузка карточек при загрузки страницы
const cardList = new CardList(htmlListCard, api, card, preloading);
// увеличение фото
const zoomPhoto = new ZoomPhoto(htmlPopUpPhoto);
// Валидация формы
const validation = new Validation(htmlForm);
// Форма редактирования профиля
// const formEdit = new Form(htmlPopUpEdit, validation);
const form = new Form();
// Форма для добавления нового места
// const formAdd = new Form(htmlPopUpAdd);
// Профиль
const profile = new Profile(userProfile, api, preloading);

/*

Привет! Для 9 проектной работы тебе понадобится дополнительная информация. Вот она.
Токен: 168a5e64-116b-4823-bcb6-e65bb6a0c4f2
Идентификатор группы: cohort6

*/