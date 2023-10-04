import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }


  openPopup(name, link) {
    this._img.src = link.currentTarget.src;
    this._img.alt = name.currentTarget.alt;
    this._caption.textContent = name.currentTarget.nextElementSibling.textContent;
    openPopup(this._popup);
  }
}
