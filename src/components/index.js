import '../styles/index.css';
import { selectors, toggleButtonState, enableValidation } from './validate';
import { renderLoading, error } from './utils';
import { cardZoomPopup, cardZoomButtonClose, openPopup, closePopup, closePopupOverlay } from './modal';
import { createCard, addCard } from './card';
import { userData, cardsData, editProfile, editAva, postCard } from './api';

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
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');

// Обработка данных с сервера

function setUserInfo(userInfo) {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
};

function renderItems(cardInfo, userId) {
  cardInfo.forEach(function (el) {
    const otherLikes = el.likes.length;
    const initialCard = createCard(el.name, el.link, el.name, otherLikes, el._id, el.owner._id, userId);
    addCard(initialCard);
    el.likes.forEach(function (elLike) {
      if (elLike._id === userId) {
        const buttonLike = document.getElementById(el._id).querySelector('.card__like-button');
        buttonLike.classList.add('card__like-button_active');
      }
    });
  });
};

Promise.all([userData, cardsData])
  .then(data => {
    console.log(data[1]);
    const userId = data[0]._id;
    setUserInfo(data[0]);
    renderItems(data[1], userId);
    console.log(data[1]);
  })
  .catch(error);

// Отправка формы профиля

function handleFormSubmitProfileEdit(evt) {
  evt.preventDefault();

  editProfile(profileName.textContent = nameInput.value, profileDescription.textContent = jobInput.value)
    .then(() => closePopup(profileEditPopup))
    .then(() => renderLoading(profileButtonSave))
    .catch(error);
};

// Отправка формы аватара

function handleFormSubmitAvaEdit(evt) {
  evt.preventDefault();

  editAva(profileAvatar.src = avaInput.value)
    .then(() => closePopup(avaEditPopup))
    .then(() => renderLoading(avaButtonSave))
    .catch(error);
};


// Отправка формы карточки

function handleFormSubmitCardCreate(evt) {
  evt.preventDefault();

  const txtInput = imgNameInput.value;
  const imgInput = imgLinkInput.value;

  postCard(txtInput, imgInput)
    .then(data => {
      const otherLikes = data.likes.length;
      const card = createCard(data.name, data.link, data.name, otherLikes, data._id, data.owner._id, data.owner._id);
      addCard(card, card);
      closePopup(cardAddPopup);
    })
    .then(() => renderLoading(cardButtonSave, cardButtonSave))
    .catch(error);
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

// Изменения текста кнопки:

profileButtonSave.addEventListener('click', () => {
  renderLoading(profileButtonSave);
});
avaButtonSave.addEventListener('click', () => {
  renderLoading(avaButtonSave);
});
cardButtonSave.addEventListener('click', () => {
  renderLoading(cardButtonSave, cardButtonSave);
});
/// Ня!
///boop
// Изменения есть?
///Изменения есть!
