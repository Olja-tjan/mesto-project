import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  openPopup(evt) {
    this._img.src = evt.currentTarget.src;
    this._img.alt = evt.currentTarget.alt;
    this._caption.textContent = evt.currentTarget.nextElementSibling.textContent;
    openPopup(this._popup);
  }
}
