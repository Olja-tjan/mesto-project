import { renderLoading } from './utils';
export { cardZoomPopup, cardZoomButtonClose, openPopup, closePopup, openedPopupImage, closePopupOverlay };

const cardZoomPopup = document.querySelector('.popup_card-zoom');
const cardZoomButtonClose = cardZoomPopup.querySelector('.popup__button-close');
const img = cardZoomPopup.querySelector('.popup__image');
const caption = cardZoomPopup.querySelector('.popup__caption');

// Работа модальных окон:

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

// Закрытие модального окна нажатием на оверлей

function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
};

// Закрытие модального окна нажатием на Esc

function closePopupEsc(evt) {
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
