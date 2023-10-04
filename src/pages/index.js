import './index.css';

import { Api } from '../components/Api';
import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage';
import { Section } from '../components/Section';
import { UserInfo } from '../components/UserInfo';
import { selectors, error } from '../utils/utils';


const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const profileAvatarButton = document.querySelector('.profile__overlay');

const nameInput = document.querySelector('#name');
const aboutInput = document.querySelector('#description');

const formElementEditProfile = document.forms["form-edit-profile"];
const formElementAddCard = document.forms["form-create-card"];
const formElementEditAva = document.forms["form-edit-ava"];


// Слушатели кнопок открытия форм:

profileEditButton.addEventListener('click', () => {
  profileEditForm.openPopup();
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  aboutInput.value = info.about;
});


cardAddButton.addEventListener('click', () => {
  cardAddForm.openPopup();
  formValidatorAddCard.resetValidation();
});


profileAvatarButton.addEventListener('click', () => {
  editAvaForm.openPopup();
  formValidatorEditAva.resetValidation();
});


const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
});


const userInfo = new UserInfo({
  userName: '.profile__name',
  userAbout: '.profile__description',
  userAvatar: '.profile__avatar'
});


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatarInfo(userData.avatar);
    cardContainer.renderItems(cards);
  })
  .catch(error);


const cardContainer = new Section({
  items: [],
  renderer: (item) => {
    const card = createCard(item);
    cardContainer.addItem(card);
  },
},
  '.cards__links'
);
let userId;


function createCard(cardData) {
  const card = new Card(
    userId,
    cardData,
    '#card-template',
    {
      handleCardClick: (name, link) => {
        popupWithImage.openPopup(link, name);
      },
    },
    {
      handleLikeClick: () => {
        card.checkingLike()
          ? api
            .removeLike(id)
            .then((res) => {
              card.updateCounter(res.likes);
            })
            .catch(error)
          : api
            .addLike(id)
            .then((res) => {
              card.updateCounter(res.likes);
            })
            .catch(error)
      },
    },
    {
      handleRemoveClick: () => {
        api
          .removeCard(cardData._id)
          .then(() => {
            card.handleRemoveCard()
          })
          .catch(error)
      },
    }
  );
  const cardElement = card.addCard();
  return cardElement;
}


// Экземпляры класса валидации

const formValidatorEditProfile = new FormValidator(selectors, formElementEditProfile);
formValidatorEditProfile.enableValidation();

const formValidatorAddCard = new FormValidator(selectors, formElementAddCard);
formValidatorAddCard.enableValidation();

const formValidatorEditAva = new FormValidator(selectors, formElementEditAva);
formValidatorEditAva.enableValidation();


// Экземпляры классов форм

const profileEditForm = new PopupWithForm('.popup_profile-edit', (values) => {
  profileEditForm.renderLoading("Сохранение...");
  api
    .editUserInfo(values)
    .then((res) => userInfo.setUserInfo(res.name, res.about))
    .then(() => profileEditForm.closePopup())
    .catch(error)
    .finally(() => profileEditForm.renderLoading("Сохранить"));
});
profileEditForm.setEventListeners();


const cardAddForm = new PopupWithForm('.popup_card-add', (values) => {
  cardAddForm.renderLoading("Сохранение...");
  api
    .addCard(values)
    .then((res) => cardContainer.addItem(createCard(res)))
    .then(() => cardAddForm.closePopup())
    .catch(error)
    .finally(() => cardAddForm.renderLoading("Создать"));
});
cardAddForm.setEventListeners();


const editAvaForm = new PopupWithForm('.popup_ava-edit', (values) => {
  editAvaForm.renderLoading("Сохранение...");
  api
    .editAvatar(values)
    .then((res) => userInfo.setAvatarInfo(res))
    .then(() => editAvaForm.closePopup())
    .catch(error)
    .finally(() => editAvaForm.renderLoading("Сохранить"));
});
editAvaForm.setEventListeners();


const popupWithImage = new PopupWithImage('.popup_card-zoom');
popupWithImage.setEventListeners();
