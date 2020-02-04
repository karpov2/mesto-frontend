/*
 * Подключение модулей
 */

import '../pages/style.css';
import * as dom from './DOM.js';
import {Api} from './Api.js';
import {Preloading} from './Preloading.js';
import {Card} from './Card.js';
import {CardList} from './CardList.js';
import {Popup} from './Popup.js';
import * as events from './events.js';
import {ZoomPhoto} from './ZoomPhoto.js';
import {Form} from './Form.js';
import {Validation} from './Validation.js';
import {Profile} from './Profile.js';

// Подключение API
const api = new Api(dom.connectionApi);
// Предварительная загрузка
const preloading = new Preloading(dom.htmlPreloading);
// Работа с карточкой 
const card = new Card(dom.htmlCard, api, preloading);
// Загрузка карточек при загрузки страницы
const cardList = new CardList(dom.htmlListCard, api, card, dom.user);
// увеличение фото
const zoomPhoto = new ZoomPhoto(dom.htmlPopUpPhoto);
// Валидация формы
const validation = new Validation(dom.htmlForm);
// Форма
const form = new Form();
// Профиль
const profile = new Profile(dom.userProfile, api, preloading);

export {api, preloading, card, cardList, zoomPhoto, validation, form, profile};








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