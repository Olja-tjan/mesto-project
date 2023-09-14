import { checkingStatus, error } from './utils';
import { openedPopupImage } from './modal';
import { addLike, removeLike, removeCard } from './api';
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
        .then(checkingStatus)
        .catch(error);
      deleteCard(cardId);
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
      .then(checkingStatus)
      .then(data => {
        countLikes(counterElement, data.likes.length)
      })
      .catch(error);
  } else {
    removeLike(cardId)
      .then(checkingStatus)
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
