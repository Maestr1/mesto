const antalia = new URL('../images/antalia.jpg', import.meta.url)
const budapest = new URL('../images/budapest.jpg', import.meta.url)
const karachaevsk = new URL('../images/karachaevsk.jpg', import.meta.url)
const sochi = new URL('../images/sochi.jpg', import.meta.url)
const elbrus = new URL('../images/elbrus.jpg', import.meta.url)
const dombai = new URL('../images/dombai.jpg', import.meta.url)


// Объявляем массив из объектов карточек
export const cardsArray = [
  {
    name: 'Анталия',
    link: antalia
  },
  {
    name: 'Будапешт',
    link: budapest
  },
  {
    name: 'Карачаево-Черкесия',
    link: karachaevsk
  },
  {
    name: 'Красная поляна',
    link: sochi
  },
  {
    name: 'Гора Эльбрус',
    link: elbrus
  },
  {
    name: 'Домбай',
    link: dombai
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