import { openedPopupImage } from './modal';
import { plusLike, minusLike, promiseDeleteCard } from './api';
export { createCard, addCard, countLikes, deleteCard };

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
      promiseDeleteCard(cardId);
    });
  };
  imageCard.addEventListener('click', (evt) => {
    openedPopupImage(evt);
  });

  cardElement.querySelector('.card__caption').textContent = txt;
  cardElement.querySelector('.card__image').src = img;
  cardElement.querySelector('.card__image').alt = alt;
  cardElement.id = cardId;
  return cardElement
};

function addCard(item) {
  cardsLinks.prepend(item);
};

// Лайк карточки

function likeCard(cardId, counterElement, buttonLike) {

  buttonLike.classList.toggle('card__like-button_active');
  if (buttonLike.classList.contains('card__like-button_active')) {
    plusLike(cardId, counterElement);
  } else {
    minusLike(cardId, counterElement);
  }
};

// Удаление карточки

function deleteCard(cardId) {
  const cardItem = document.getElementById(cardId);
  cardItem.remove();
};
