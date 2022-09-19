import {Popup} from './Popup';

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