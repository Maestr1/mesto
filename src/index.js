import './pages/index.css';

//////////////Работа с попапом//////////////
import {cardsArray, settings} from './scripts/data';
import {Section} from './scripts/components/Section';
import {Card} from './scripts/components/Card';
import {FormValidator} from './scripts/components/FormValidator';
import {Popup, PopupWithImage, PopupWithForm} from './scripts/components/Popup';
import {UserInfo} from './scripts/components/UserInfo';

import {
  popupProfileEdit,
  popupProfileEditCloseBtn,
  profileEditForm,
  popupPlaceAdd,
  popupPlaceAddCloseBtn,
  placeAddForm,
  popupZoom,
  popupZoomCloseBtn,
  profileName,
  profileJob,
  popupProfileEditNameInput,
  popupProfileEditJobInput,
  popupPlaceAddNameInput,
  popupPlaceAddLinkInput,
  profileEditBtn,
  placeAddBtn,
  gallery,
  zoomPic,
  zoomDesc
} from './scripts/Utils/constants';

const popupWithImageInstance = new PopupWithImage(popupZoom, zoomDesc, zoomPic);
const popupProfileEditClass = new PopupWithForm(popupProfileEdit, editProfileInfo);
const popupPlaceAddClass = new PopupWithForm(popupPlaceAdd, addCard);
const userInfo = new UserInfo(profileName, profileJob, popupProfileEditNameInput, popupProfileEditJobInput);

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
  userInfo.setUserInfo();
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
  const item = [{name: popupPlaceAddNameInput.value, link: popupPlaceAddLinkInput.value}];
  createNewSection(item).renderItems();
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
  popupProfileEditNameInput.value = userInfo.getUserInfo().name;
  popupProfileEditJobInput.value = userInfo.getUserInfo().job;
  profileEditFormValidator.resetValidation();
  popupProfileEditClass.open();
});

placeAddBtn.addEventListener('click', () => {
  //очищаем значения, которые могли остаться от предыдущего добавения
  placeAddFormValidator.resetValidation();
  placeAddForm.reset();
  popupPlaceAddClass.open();
});