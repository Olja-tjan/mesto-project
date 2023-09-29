import { error } from './utils';
import { openedPopupImage } from './modal';
export { createCard, addCard };

const cardTemplate = document.querySelector('#card-template').content;
const cardsLinks = document.querySelector('.cards__links');

// Счётчик лайков

function countLikes(counterElement, counter) {
  counterElement.textContent = counter;
};

// Добавление карточек:

function createCard(txt, img, alt, otherLikes, cardId, ownersId, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonLike = cardElement.querySelector('.card__like-button');
  const buttonTrash = cardElement.querySelector('.card__trash-button');
  const imageCard = cardElement.querySelector('.card__image');
  const counterElement = cardElement.querySelector('.card__likes');

  countLikes(counterElement, otherLikes);
  buttonLike.addEventListener('click', function () {
    likeCard(cardId, counterElement, buttonLike);
  });
  if (ownersId !== userId) {
    buttonTrash.style.display = 'none';
  } else {
    buttonTrash.addEventListener('click', function () {
      removeCard(cardId)
        .then(deleteCard(cardId))
        .catch(error);
    });
  };
  imageCard.addEventListener('click', (evt) => {
    openedPopupImage(evt);
  });

  cardElement.querySelector('.card__caption').textContent = txt;
  imageCard.src = img;
  imageCard.alt = alt;
  cardElement.id = cardId;
  return cardElement
};

function addCard(item, card) {
  if (item === card) {
    cardsLinks.prepend(item);
  } else {
    cardsLinks.append(item);
  }
};

// Лайк карточки

function likeCard(cardId, counterElement, buttonLike) {

  buttonLike.classList.toggle('card__like-button_active');
  if (buttonLike.classList.contains('card__like-button_active')) {
    addLike(cardId)
      .then(data => {
        countLikes(counterElement, data.likes.length)
      })
      .catch(error);
  } else {
    removeLike(cardId)
      .then(data => {
        countLikes(counterElement, data.likes.length)
      })
      .catch(error);
  }
};

// Удаление карточки

function deleteCard(cardId) {
  const cardItem = document.getElementById(cardId);
  cardItem.remove();
};

class Card {
  constructor(userId, cardData, templateSelector, { handleCardClick }, { handleLikeClick }, { handleDeleteClick }) {
    this._userId = userId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._name = cardData.name;
    this._link = cardData.link;
    this._otherLikes = cardData.otherLikes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._buttonLike = this._cardElement.querySelector('.card__like-button');
    this._buttonTrash = this._cardElement.querySelector('.card__trash-button');
    this._imageCard = this._cardElement.querySelector('.card__image');
    this._counterElement = this._cardElement.querySelector('.card__likes');
    this._caption = this._cardElement.querySelector('.card__caption');


    if (this._ownersId !== this._userId) {
      this._buttonTrash.style.display = 'none';
    }

    this._setEventListeners();

		this._counterElement.textContent = this._otherLikes;
    this._caption.textContent = this._name;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;

    return this._cardElement
  }


  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardId);
    });
    this._buttonTrash.addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._imageCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
