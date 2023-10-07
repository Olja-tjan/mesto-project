export { selectors, profileEditButton, cardAddButton, profileAvatarButton, nameInput, aboutInput, formElementEditProfile, formElementAddCard, formElementEditAva };


const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const profileAvatarButton = document.querySelector('.profile__overlay');

const nameInput = document.querySelector('#name');
const aboutInput = document.querySelector('#description');

const formElementEditProfile = document.forms["form-edit-profile"];
const formElementAddCard = document.forms["form-create-card"];
const formElementEditAva = document.forms["form-edit-ava"];

const selectors = {
  inputErrorClass: 'popup__input_error',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save'
};
