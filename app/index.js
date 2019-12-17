/*
 * Подключение модулей
 */

// Подключение API
const api = new Api(connectionApi);
// Предварительная загрузка
const preloading = new Preloading(htmlPreloading);
// Работа с карточкой 
const card = new Card(htmlCard, api, preloading);
// Загрузка карточек при загрузки страницы
const cardList = new CardList(htmlListCard, api, card, user);
// увеличение фото
const zoomPhoto = new ZoomPhoto(htmlPopUpPhoto);
// Валидация формы
const validation = new Validation(htmlForm);
// Форма
const form = new Form();
// Профиль
const profile = new Profile(userProfile, api, preloading);

/*

Привет! Для 9 проектной работы тебе понадобится дополнительная информация. Вот она.
Токен: 168a5e64-116b-4823-bcb6-e65bb6a0c4f2
Идентификатор группы: cohort6

*/

/**
 * Здравствуйте.
 * Очень необычная и интересная работа. Правильная организация коассов
 *
 * В файле events.js вы слишком усложнили мне так показалось. Может стоить разбить на небольшие функции
 *
 * catch я бы рекомендовал перенести в класс Api(на каждый метод), проблема с сетью или сервера должна отрабатываться именно этим классом
 *
 */