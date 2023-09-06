import '../styles/index.css';
import { initialCards } from './constants';
import { selectors, hideInputError, enableValidation } from './validate';
import { cardZoomPopup, cardZoomButtonClose, openPopup, closePopup, closePopupOverlay } from './modal';
import { createCard, addCard } from './card';

const profileEditPopup = document.querySelector('.popup_profile-edit');
const cardAddPopup = document.querySelector('.popup_card-add');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const profileEditButtonClose = profileEditPopup.querySelector('.popup__button-close');
const cardAddButtonClose = cardAddPopup.querySelector('.popup__button-close');
const profileEditForm = profileEditPopup.querySelector('.popup__container-form');
const cardAddForm = cardAddPopup.querySelector('.popup__container-form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const imgNameInput = document.querySelector('#image-name');
const imgLinkInput = document.querySelector('#image-link');

// Отправка формы профиля:

function handleFormSubmitProfileEdit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(profileEditPopup);
};

// Добавление шести карточек:

initialCards.forEach(function (element) {
  const txtEl = element.name;
  const imgEl = element.link;
  const altEl = element.alt;

  const initialCard = createCard(txtEl, imgEl, altEl);
  addCard(initialCard);
});

// Отправка формы карточки:

function handleFormSubmitCardCreate(evt) {
  evt.preventDefault();

  const txtInput = imgNameInput.value;
  const imgInput = imgLinkInput.value;

  const card = createCard(txtInput, imgInput, txtInput);
  addCard(card);
  closePopup(cardAddPopup);
  evt.target.reset();
};

// Добавление слушателей:

// Кнопок открытия форм:

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  enableValidation(selectors);
  openPopup(profileEditPopup);
});
cardAddButton.addEventListener('click', () => {
  enableValidation(selectors);
  openPopup(cardAddPopup);
});

// Кнопок закрытия форм:

profileEditButtonClose.addEventListener('click', () => {
  closePopup(profileEditPopup);
});
cardAddButtonClose.addEventListener('click', () => {
  closePopup(cardAddPopup);
});
cardZoomButtonClose.addEventListener('click', () => {
  closePopup(cardZoomPopup);
});

// Закрытия форм нажатием на овелэй:

profileEditPopup.addEventListener('click', closePopupOverlay);
cardAddPopup.addEventListener('click', closePopupOverlay);
cardZoomPopup.addEventListener('click', closePopupOverlay);

// Отправка форм:

profileEditForm.addEventListener('submit', handleFormSubmitProfileEdit);
cardAddForm.addEventListener('submit', handleFormSubmitCardCreate);
