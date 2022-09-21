import {Popup} from './Popup';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._zoomPic = this._popupElement.querySelector('.popup__zoom-pic');
    this._zoomDesc = this._popupElement.querySelector('.popup__desc');
  }

  open(name, link) {
    this._zoomPic.src = link;
    this._zoomPic.alt = `На изображении ${name}`;
    this._zoomDesc.textContent = name;
    super.open();
  }
}