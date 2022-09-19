export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._escHandler = this._handleEscClose.bind(this);
    this._overlayHandler = this._closePopupFromOverlay.bind(this);
    this._closeBtnHandler = this.close.bind(this);
    this._closeBtn = this._popupSelector.querySelector('.popup__close-btn');
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
    document.addEventListener('keydown', this._escHandler);
    this._closeBtn.addEventListener('click', this._closeBtnHandler);
    this._popupSelector.addEventListener('mousedown', this._overlayHandler);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._escHandler);
    this._closeBtn.removeEventListener('click', this._closeBtnHandler);
    this._popupSelector.removeEventListener('mousedown', this._overlayHandler);
  }

  open() {
    this.setEventListeners();
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this.removeEventListeners();
    this._popupSelector.classList.remove('popup_opened'); //убираем класс открытия
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector, zoomDesc, zoomPic) {
    super(popupSelector);
    this._zoomPic = zoomPic;
    this._zoomDesc = zoomDesc;
  }

  open(name, link) {
    this._zoomPic.src = link;
    this._zoomPic.alt = `На изображении ${name}`;
    this._zoomDesc.textContent = name;
    super.open();
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
  }

  // _getInputValues() {
  //   this.item = [{name: popupPlaceAddNameInput.value, link: popupPlaceAddLinkInput.value}];
  //   return this.item;
  // }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', this._handlerFormSubmit);
    super.setEventListeners();
  }

  close() {

    super.close();
  }

}
