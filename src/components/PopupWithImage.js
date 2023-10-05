import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }


  openPopup(name, link) {
    super.openPopup();
    this._img.src = link;
    this._img.alt = name;
    this._caption.textContent = name;
  }
}
