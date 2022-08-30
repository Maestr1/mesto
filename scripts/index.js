//////////////Работа с попапом//////////////
import {cardsArray, settings} from './data.js'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js';

const popupProfileEdit = document.querySelector('#popup-edit');
const popupProfileEditCloseBtn = popupProfileEdit.querySelector('.popup__close-btn'); //Кнопка закрытия попапа
const profileEditForm = popupProfileEdit.querySelector('.popup__form');
const popupPlaceAdd = document.querySelector('#popup-add');
const popupPlaceAddCloseBtn = popupPlaceAdd.querySelector('.popup__close-btn'); //Кнопка закрытия попапа
const placeAddForm = popupPlaceAdd.querySelector('.popup__form');
const popupZoom = document.querySelector('#popup-zoom');
const popupZoomCloseBtn = popupZoom.querySelector('.popup__close-btn'); //Кнопка закрытия попапа
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupProfileEditNameInput = document.querySelector('#popup-edit-input-name'); //Поле ввода имени
const popupProfileEditJobInput = document.querySelector('#popup-edit-input-job'); //Поле ввода профессии
const popupPlaceAddNameInput = document.querySelector('#popup-add-input-name'); //Поле ввода имени
const popupPlaceAddLinkInput = document.querySelector('#popup-add-input-link'); //Поле ввода ссылки на изображение
const profileEditBtn = document.querySelector('.profile__edit-btn'); //Кнопка редактирования профиля
const placeAddBtn = document.querySelector('.profile__add-btn'); //Кнопка добавления места
const gallery = document.querySelector('.gallery');
const zoomPic = document.querySelector('.popup__zoom-pic');
const zoomDesc = document.querySelector('.popup__desc');


//Управление закрытием попапа по нажатию 'esc'
function closePopupFromEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened')
    closePopup(activePopup)
  }
}

//Управление закрытием попапа по клику на оверлей
function closePopupFromOverlay(evt) {
  const activePopup = document.querySelector('.popup_opened')
  if (evt.target.classList.contains('popup')) {
    closePopup(activePopup)
  }
}

//Управление открытием попапа с кнопки
function openPopup(popup) {
  document.addEventListener('keydown', closePopupFromEsc)
  popup.addEventListener('mousedown', closePopupFromOverlay)
  popup.classList.add('popup_opened'); //добавляем класс открытия
}

//Управление закрытием попапа с кнопки
function closePopup(popup) {
  document.removeEventListener('keydown', closePopupFromEsc)
  popup.removeEventListener('mousedown', closePopupFromOverlay)
  popup.classList.remove('popup_opened'); //убираем класс открытия
}

//Сохранение данных из формы в строках профиля
function editProfileInfo(evt) {
  evt.preventDefault(); //отменяем действие по умолчанию (перезагрузка страницы при отправке)

  profileName.textContent = popupProfileEditNameInput.value; //присваеваем элементам в профиле
  profileJob.textContent = popupProfileEditJobInput.value;

  closePopup(popupProfileEdit); //закрываем попап
}

profileEditForm.addEventListener('submit', editProfileInfo); //функция срабатывает по событию "submit"

//////////////Загрузка карточек//////////////

function newCardClass(name, link, templateSelector, func) {
  return new Card(name, link, templateSelector, func);
}

//Загрузка карточек из массива
function loadCards(arr) {
  arr.forEach((item) => {
    gallery.append(newCardClass(item.name, item.link, '.card-template', zoomImage).cloneCard())
  });
}

loadCards(cardsArray);

//////////////Добавление карточек из формы//////////////

function addCard(evt) {
  evt.preventDefault();
  const name = popupPlaceAddNameInput.value;
  const link = popupPlaceAddLinkInput.value;
  gallery.prepend(newCardClass(name, link, '.card-template', zoomImage).cloneCard());
  closePopup(popupPlaceAdd);
}

//Открытие попапа с увеличенным изображением
function zoomImage(name, link) {
  zoomPic.src = link;
  zoomPic.alt = `На изображении ${name}`;
  zoomDesc.textContent = name;
  openPopup(popupZoom);
}

//Включение валидации форм
function createFormValidationClass(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement)
    validator.enableValidation()
    placeAddBtn.addEventListener('click', () => {
      validator.resetValidation()
    })
  });
}

createFormValidationClass(settings);

//Вешаем слушатель кликов на кнопки
profileEditBtn.addEventListener('click', () => {
  //подставляем значения при открытии
  popupProfileEditNameInput.value = profileName.textContent;
  popupProfileEditJobInput.value = profileJob.textContent;
  //генерируем событие 'input, что бы кнопка была активна при открытии попапа, если данные валидны
  //т.к. проверка валидности происходит при вводе в инпут
  const popupInputEvent = new Event('input')
  popupProfileEditNameInput.dispatchEvent(popupInputEvent)
  popupProfileEditJobInput.dispatchEvent(popupInputEvent)
  openPopup(popupProfileEdit);
});

popupProfileEditCloseBtn.addEventListener('click', () => {
  closePopup(popupProfileEdit);
});

placeAddBtn.addEventListener('click', () => {
  //очищаем значения, которые могли остаться от предыдущего добавения
  placeAddForm.reset();
  openPopup(popupPlaceAdd);
});

popupPlaceAddCloseBtn.addEventListener('click', () => {
  closePopup(popupPlaceAdd);
});

placeAddForm.addEventListener('submit', addCard);

popupZoomCloseBtn.addEventListener('click', () => {
  closePopup(popupZoom);
});