import {Popup} from './Popup';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  updateFunctionToConfirm(func) {
    this._func = func
  }

  setEventListeners() {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._func()
    })
    super.setEventListeners();
  }
}