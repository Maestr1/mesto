import './index.css';

//////////////Работа с попапом//////////////
import {cardsArray, settings} from '../utils/data';
import {Section} from '../components/Section';
import {Card} from '../components/Card';
import {FormValidator} from '../components/FormValidator';
import {PopupWithForm} from '../components/PopupWithForm';
import {PopupWithImage} from '../components/PopupWithImage';
import {UserInfo} from '../components/UserInfo';

import {
  popupProfileEdit,
  popupPlaceAdd,
  profileEditBtn,
  placeAddBtn,
  inputProfileName,
  inputProfileJob
} from '../utils/constants';

//Создаем экземпляры классов
const popupWithImageInstance = new PopupWithImage('#popup-zoom');
popupWithImageInstance.setEventListeners();
const popupProfileEditClass = new PopupWithForm('#popup-edit', editProfileInfo);
popupProfileEditClass.setEventListeners();
const popupPlaceAddClass = new PopupWithForm('#popup-add', addCard);
popupPlaceAddClass.setEventListeners();
const userInfoHandler = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});

//////////////Загрузка карточек//////////////

//создает новый инстанс Card
function createNewCard(name, link) {
  return new Card(name, link, '.card-template', () => {
    popupWithImageInstance.open(name, link);
  }).cloneCard();
}

const cardLoader = new Section({
  items: cardsArray, renderer: (item) => {
    const card = createNewCard(item.placeName, item.placeLink, '.card-template', () => {
      popupWithImageInstance.open(item.placeName, item.placeLink);
    });
    cardLoader.addItem(card);
  }
}, '.gallery');

//Загрузка карточек из массива
cardLoader.renderItems();

//Загрузка карточки из формы
function addCard(formValues) {
  const newCard = createNewCard(formValues.placeName, formValues.placeLink, '.card-template', () => {
    popupWithImageInstance.open(formValues.placeName, formValues.placeLink);
  });
  cardLoader.addItem(newCard);
  popupPlaceAddClass.close();
}

//Сохранение данных из формы в строках профиля
function editProfileInfo(formValues) {
  userInfoHandler.setUserInfo(formValues);
  popupProfileEditClass.close(); //закрываем попап
}
//Валидация форм
function createNewFormValidator(settings, formElement) {
  return new FormValidator(settings, formElement.querySelector('.popup__form'));
}

//Включаем валидацию форм
const placeAddFormValidator = createNewFormValidator(settings, popupPlaceAdd);
placeAddFormValidator.enableValidation();
const profileEditFormValidator = createNewFormValidator(settings, popupProfileEdit);
profileEditFormValidator.enableValidation();

//Вешаем слушатель кликов на кнопки
profileEditBtn.addEventListener('click', () => {
  //подставляем значения при открытии
  const userInfo = userInfoHandler.getUserInfo();
  inputProfileName.value = userInfo.name;
  inputProfileJob.value = userInfo.job;
  profileEditFormValidator.resetValidation();
  popupProfileEditClass.open();
});

placeAddBtn.addEventListener('click', () => {
  //очищаем значения, которые могли остаться от предыдущего добавения
  placeAddFormValidator.resetValidation();
  popupPlaceAddClass.open();
});