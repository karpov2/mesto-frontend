/*
 * Подключение модулей
 */

//  Подключение API
const api = new Api(connectionApi);

// Работа с карточкой 
const card = new Card(htmlCard);
// Список карточек
// Загрузка карточек при загрузки страницы
const cardList = new CardList(htmlListCard, api, card);
// увеличение фото
const zoomPhoto = new ZoomPhoto(htmlPopUpPhoto);
// Форма редактирования профиля
const formEdit = new Form(htmlPopUpEdit);
// Форма для добавления нового места
const formAdd = new Form(htmlPopUpAdd);
// Валидация формы
const validation = new Validation(htmlForm);

const profile = new Profile(userProfile, api);

/*

Привет! Для 9 проектной работы тебе понадобится дополнительная информация. Вот она.
Токен: 168a5e64-116b-4823-bcb6-e65bb6a0c4f2
Идентификатор группы: cohort6

*/