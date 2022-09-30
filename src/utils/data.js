const antalia = new URL('../images/antalia.jpg', import.meta.url);
const budapest = new URL('../images/budapest.jpg', import.meta.url);
const karachaevsk = new URL('../images/karachaevsk.jpg', import.meta.url);
const sochi = new URL('../images/sochi.jpg', import.meta.url);
const elbrus = new URL('../images/elbrus.jpg', import.meta.url);
const dombai = new URL('../images/dombai.jpg', import.meta.url);


// Объявляем массив из объектов карточек
export const cardsArray = [
  {
    placeName: 'Анталия',
    placeLink: antalia
  },
  {
    placeName: 'Будапешт',
    placeLink: budapest
  },
  {
    placeName: 'Карачаево-Черкесия',
    placeLink: karachaevsk
  },
  {
    placeName: 'Красная поляна',
    placeLink: sochi
  },
  {
    placeName: 'Гора Эльбрус',
    placeLink: elbrus
  },
  {
    placeName: 'Домбай',
    placeLink: dombai
  },
];

//Объект с настройками
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

export const apiOptions = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: 'fa7292f4-824e-46b8-941f-2d01ddc8db72',
    'Content-Type': 'application/json'
  }
};