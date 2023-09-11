import '../styles/index.css';
import { selectors, toggleButtonState, enableValidation } from './validate';
import { cardZoomPopup, cardZoomButtonClose, openPopup, closePopup, closePopupOverlay } from './modal';
import { profileName, profileDescription, profileAvatar, editProfile, editAva, postCard } from './api';

const profileEditPopup = document.querySelector('.popup_profile-edit');
const cardAddPopup = document.querySelector('.popup_card-add');
const avaEditPopup = document.querySelector('.popup_ava-edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const profileEditButtonClose = profileEditPopup.querySelector('.popup__button-close');
const cardAddButtonClose = cardAddPopup.querySelector('.popup__button-close');
const avaEditButtonClose = avaEditPopup.querySelector('.popup__button-close');
const profileEditForm = profileEditPopup.querySelector('.popup__container-form');
const cardAddForm = cardAddPopup.querySelector('.popup__container-form');
const avaEditForm = avaEditPopup.querySelector('.popup__container-form');
const nameInput = document.querySelector('#name');
const avaInput = document.querySelector('#image-link-ava');
const jobInput = document.querySelector('#description');
const imgNameInput = document.querySelector('#image-name');
const imgLinkInput = document.querySelector('#image-link');
const profileButtonSave = profileEditForm.querySelector('.popup__button-save');
const avaButtonSave = avaEditForm.querySelector('.popup__button-save');
const cardButtonSave = cardAddForm.querySelector('.popup__button-save');
const { inactiveButtonClass } = selectors;

// Изменеие кнопок отправки данных:

function notifySaving(btnSave) {
  btnSave.textContent = 'Сохранение...';
};
function returnDefaultText(btnSave) {
  btnSave.textContent = 'Сохранить';
};
function returnDefaultTextcardAdd(btnSave) {
  btnSave.textContent = 'Создать';
};

// Отправка формы профиля

function handleFormSubmitProfileEdit(evt) {
  evt.preventDefault();

  notifySaving(profileButtonSave);
  editProfile(profileName.textContent = nameInput.value, profileDescription.textContent = jobInput.value)
  closePopup(profileEditPopup);
  returnDefaultText(profileButtonSave);
};

// Отправка формы аватара

function handleFormSubmitAvaEdit(evt) {
  evt.preventDefault();

  notifySaving(avaButtonSave);
  editAva(profileAvatar.src = avaInput.value)
  closePopup(avaEditPopup);
  returnDefaultText(avaButtonSave);
};

// Отправка формы карточки

function handleFormSubmitCardCreate(evt) {
  evt.preventDefault();

  notifySaving(cardButtonSave);
  const txtInput = imgNameInput.value;
  const imgInput = imgLinkInput.value;

  postCard(txtInput, imgInput, txtInput);
  closePopup(cardAddPopup);
  returnDefaultTextcardAdd(cardButtonSave);
  evt.target.reset();
};

// Валидация форм

enableValidation(selectors);


// Добавление слушателей:

// Кнопок открытия форм:

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  toggleButtonState([nameInput, jobInput], profileButtonSave, inactiveButtonClass);
  openPopup(profileEditPopup);
});
profileAvatar.addEventListener('click', () => {
  toggleButtonState([avaInput], avaButtonSave, inactiveButtonClass);
  openPopup(avaEditPopup);
});
cardAddButton.addEventListener('click', () => {
  toggleButtonState([imgNameInput, imgLinkInput], cardButtonSave, inactiveButtonClass);
  openPopup(cardAddPopup);
});

// Кнопок закрытия форм:

profileEditButtonClose.addEventListener('click', () => {
  closePopup(profileEditPopup);
});
avaEditButtonClose.addEventListener('click', () => {
  closePopup(avaEditPopup);
});
cardAddButtonClose.addEventListener('click', () => {
  closePopup(cardAddPopup);
});
cardZoomButtonClose.addEventListener('click', () => {
  closePopup(cardZoomPopup);
});

// Закрытия форм нажатием на овелэй:

profileEditPopup.addEventListener('click', closePopupOverlay);
avaEditPopup.addEventListener('click', closePopupOverlay);
cardAddPopup.addEventListener('click', closePopupOverlay);
cardZoomPopup.addEventListener('click', closePopupOverlay);

// Отправка форм:

profileEditForm.addEventListener('submit', handleFormSubmitProfileEdit);
avaEditForm.addEventListener('submit', handleFormSubmitAvaEdit);
cardAddForm.addEventListener('submit', handleFormSubmitCardCreate);
