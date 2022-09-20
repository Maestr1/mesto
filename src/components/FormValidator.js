export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector)
  }

  //Показ ошибки валидации
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

//Скрытие ошибки валидации
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  //Проверка валидности поля ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Проверка валидности формы
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid
    })
  }

  _disableButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass)
    this._buttonElement.setAttribute('disabled', 'disabled')
  }

//Переключение статуса активности кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton()
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled')
    }
  }

  //Сброс статуса валидности на форме
  resetValidation() {
    this._disableButton()
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //Назначение обработчиков
  _setEventListeners() {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState()
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}