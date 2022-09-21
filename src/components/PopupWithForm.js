import {Popup} from './Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form')
    this._inputList = this._form.querySelectorAll('input')
  }


  _getInputValues() {
    this._formValues = {}
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })

    return this._formValues
  }

  setEventListeners() {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerFormSubmit(this._getInputValues())
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset()
    super.close();
  }

}