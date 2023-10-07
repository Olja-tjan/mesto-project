import './index.css';

import { Api } from '../components/Api';
import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithImage } from '../components/PopupWithImage';
import { Section } from '../components/Section';
import { UserInfo } from '../components/UserInfo';
import { error } from '../utils/utils';
import { selectors, profileEditButton, cardAddButton, profileAvatarButton, nameInput, aboutInput, formElementEditProfile, formElementAddCard, formElementEditAva } from '../utils/constants';


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
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
  headers: {
    authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0',
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
        popupWithImage.openPopup(name, link);
      },
    },
    {
      handleLikeClick: (id) => {
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
  const cardElement = card.createCard();
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
    .editUserInfo(values.name, values.description)
    .then((res) =>
      userInfo.setUserInfo(res.name, res.about),
      profileEditForm.closePopup())
    .catch(error)
    .finally(() => profileEditForm.renderLoading("Сохранить"));
});
profileEditForm.setEventListeners();


const cardAddForm = new PopupWithForm('.popup_card-add', (values) => {
  console.log(values);
  cardAddForm.renderLoading("Сохранение...");
  api
    .addCard(values['image-name'], values['image-link'])
    .then((res) =>
      cardContainer.addItem(createCard(res)),
      cardAddForm.closePopup())
    .catch(error)
    .finally(() => cardAddForm.renderLoading("Создать"));
});
cardAddForm.setEventListeners();


const editAvaForm = new PopupWithForm('.popup_ava-edit', (values) => {
  console.log(values);
  editAvaForm.renderLoading("Сохранение...");
  api
    .editAvatar(values['image-link-ava'])
    .then((res) =>
      userInfo.setAvatarInfo(res.avatar),
      editAvaForm.closePopup())
    .catch(error)
    .finally(() => editAvaForm.renderLoading("Сохранить"));
});
editAvaForm.setEventListeners();


const popupWithImage = new PopupWithImage('.popup_card-zoom');
popupWithImage.setEventListeners();
