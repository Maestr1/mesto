import {Popup} from './Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
  }

  _getInputValues() {
    const inputs = Array.from(this._popupSelector.querySelectorAll('input'));
    return [{
      name: inputs[0].value,
      link: inputs[1].value
    }];
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', this._handlerFormSubmit);
    super.setEventListeners();
  }

  close() {
    this._popupSelector.querySelector('.popup__form').reset()
    super.close();
  }

}