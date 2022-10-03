//Объект с настройками
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: 'fa7292f4-824e-46b8-941f-2d01ddc8db72',
    'Content-Type': 'application/json'
  }
};