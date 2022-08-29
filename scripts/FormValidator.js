export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement
  }

  //Показ ошибки валидации
  _showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }

//Скрытие ошибки валидации
  _hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  }

  //Проверка валидности поля ввода
  _checkInputValidity(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      this._hideInputError(formElement, inputElement, settings);
    }
  }

  //Проверка валидности формы
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid
    })
  }

//Переключение статуса активности кнопки
  _toggleButtonState(inputList, buttonElement, settings) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass)
      buttonElement.setAttribute('disabled', 'disabled')
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass)
      buttonElement.removeAttribute('disabled')
    }
  }

  //Назначение обработчиков
  _setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector)
    this._toggleButtonState(inputList, buttonElement, settings)
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, settings);
        this._toggleButtonState(inputList, buttonElement, settings)
      });
    });

  }

//Сброс статуса валидности на форме
  resetValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector)
    this._toggleButtonState(inputList, buttonElement, this._settings);
    Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)).forEach((inputElement) => {
      this._hideInputError(this._formElement, inputElement, this._settings);
    });
  }


  enableValidation() {
    this._setEventListeners(this._formElement, this._settings);
  }
}