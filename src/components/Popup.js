export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._escHandler = this._handleEscClose.bind(this);
    this._overlayHandler = this._closePopupFromOverlay.bind(this);
    this._closeBtnHandler = this.close.bind(this);
    this._closeBtn = this._popupElement.querySelector('.popup__close-btn');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closePopupFromOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    //document.addEventListener('keydown', this._escHandler);
    this._closeBtn.addEventListener('click', this._closeBtnHandler);
    this._popupElement.addEventListener('mousedown', this._overlayHandler);
  }

  open() {
    document.addEventListener('keydown', this._escHandler);
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._escHandler);
    this._popupElement.classList.remove('popup_opened'); //убираем класс открытия
  }
}


