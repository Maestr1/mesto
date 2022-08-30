// Объявляем массив из объектов карточек
export const cardsArray = [
  {
    name: 'Анталия',
    link: './images/antalia.jpg'
  },
  {
    name: 'Будапешт',
    link: './images/budapest.jpg'
  },
  {
    name: 'Карачаево-Черкесия',
    link: './images/Karachaevsk.jpg'
  },
  {
    name: 'Красная поляна',
    link: './images/sochi.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/Elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/Dombai.jpg'
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
}