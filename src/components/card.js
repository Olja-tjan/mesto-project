import { openedPopupImage } from './modal';
export { createCard, addCard };

const cardTemplate = document.querySelector('#card-template').content;
const cardsLinks = document.querySelector('.cards__links');

// Добавление карточек:

function createCard(txt, img, alt) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonLike = cardElement.querySelector('.card__like-button');
  const buttonTrash = cardElement.querySelector('.card__trash-button');
  const imageCard = cardElement.querySelector('.card__image');

  buttonLike.addEventListener('click', likeCard);
  buttonTrash.addEventListener('click', deletedCard);
  imageCard.addEventListener('click', (evt) => {
    openedPopupImage(evt);
  });

  cardElement.querySelector('.card__caption').textContent = txt;
  cardElement.querySelector('.card__image').src = img;
  cardElement.querySelector('.card__image').alt = alt;

  return cardElement
};

function addCard(item) {
  cardsLinks.prepend(item);
};

// Лайк карточки:

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_active');
};

// Удаление карточки:

function deletedCard(evt) {
  const cardItem = evt.target.closest('.card');
  cardItem.remove();
};
