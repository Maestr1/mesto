import './pages/index.css';

//////////////Работа с попапом//////////////
import {cardsArray, settings} from './Utils/data';
import {Section} from './components/Section';
import {Card} from './components/Card';
import {FormValidator} from './components/FormValidator';
import {PopupWithForm} from './components/PopupWithForm';
import {PopupWithImage} from './components/PopupWithImage';
import {UserInfo} from './components/UserInfo';

import {
  popupProfileEdit,
  popupPlaceAdd,
  popupZoom,
  profileEditBtn,
  placeAddBtn,
  gallery,
  zoomPic,
  zoomDesc
} from './Utils/constants';

const popupWithImageInstance = new PopupWithImage(popupZoom, zoomDesc, zoomPic);
const popupProfileEditClass = new PopupWithForm(popupProfileEdit, editProfileInfo);
const popupPlaceAddClass = new PopupWithForm(popupPlaceAdd, addCard);
const userInfoHandler = new UserInfo('.profile__name', '.profile__job');

//////////////Загрузка карточек//////////////

//создает новый инстанс Card и возвращает заполненную карточку
function createNewCard(name, link, templateSelector, func) {
  return new Card(name, link, templateSelector, func).cloneCard();
}

//создает новый инстанс Section и вставляет карточку в DOM
function createNewSection(itemsList) {
  const cardLoader = new Section({
    items: itemsList, renderer: (item) => {
      const card = createNewCard(item.name, item.link, '.card-template', () => {
        popupWithImageInstance.open(item.name, item.link);
      });
      cardLoader.addItem(card);
    }
  }, gallery);
  return cardLoader;
}

//Сохранение данных из формы в строках профиля
function editProfileInfo(evt) {
  evt.preventDefault(); //отменяем действие по умолчанию (перезагрузка страницы при отправке)
  userInfoHandler.setUserInfo();
  popupProfileEditClass.close(); //закрываем попап
}

//Загрузка карточек из массива
function loadCards(itemsList) {
  createNewSection(itemsList).renderItems();
}

loadCards(cardsArray);

//Загрузка карточки из формы
function addCard(evt) {
  evt.preventDefault();
  createNewSection(popupPlaceAddClass._getInputValues()).renderItems();
  popupPlaceAddClass.close();
}

function createNewFormValidator(settings, formElement) {
  return new FormValidator(settings, formElement.querySelector('.popup__form'));
}

const placeAddFormValidator = createNewFormValidator(settings, popupPlaceAdd);
placeAddFormValidator.enableValidation();

const profileEditFormValidator = createNewFormValidator(settings, popupProfileEdit);
profileEditFormValidator.enableValidation();

//Вешаем слушатель кликов на кнопки
profileEditBtn.addEventListener('click', () => {
  //подставляем значения при открытии
  const userInfo = userInfoHandler.getUserInfo();
  document.querySelector('input[name=profile-name]').value = userInfo.name;
  document.querySelector('input[name=profile-job]').value = userInfo.job;
  profileEditFormValidator.resetValidation();
  popupProfileEditClass.open();
});

placeAddBtn.addEventListener('click', () => {
  //очищаем значения, которые могли остаться от предыдущего добавения
  placeAddFormValidator.resetValidation();
  popupPlaceAddClass.open();
});