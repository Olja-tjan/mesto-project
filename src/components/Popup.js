class Popup {
    constructor (popupSelector) {
      this.popup = document.querySelector(popupSelector);
    }
}

// Работа модальных окон:

openPopup() {
  this.popup.classList.add('popup_opened');
  document.addEventListener('keydown', this._handleEscClose);
};

closePopup() {
  this.popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', this._handleEscClose);
};

// Закрытие модального окна нажатием на оверлей

function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
};

// Закрытие модального окна нажатием на Esc

_handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
};

// Открытие модального окна с картинкой

function openedPopupImage(evt) {
  img.src = evt.currentTarget.src;
  img.alt = evt.currentTarget.alt;
  caption.textContent = evt.currentTarget.nextElementSibling.textContent;
  openPopup(cardZoomPopup);
};
