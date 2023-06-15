const popups = document.querySelectorAll('.popup');
const buttonProfile = document.querySelector('.profile__edit-button');
const buttonCreate = document.querySelector('.profile__add-button');
const buttonClose = document.querySelectorAll('.popup__button-close');
const formElement = document.querySelectorAll('.popup__container-form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const imgNameInput = document.querySelector('#image-name');
const imgLinkInput = document.querySelector('#image-link');
const cardTemplate = document.querySelector('#card-template').content;
const cardsLinks = document.querySelector('.cards__links');
let buttonsLike = document.querySelectorAll('.card__like-button');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Зелёные горы на фоне голубого неба'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Зимняя река, окружённая возвышеными берегами с лесом'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Вид на серые хрущёвки'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Пик заснеженной горы на фоне серого-рыжеватого неба на заднем плане и земля с проростающей травой на переднем плане'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Прямые рельсы железной дороги, уходящие в даль, окружённые зелёным лесом'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Высокая скала являющаяся берегом замёрзшего озера байкал на фоне голубого неба'
  }
];

// Работа модальных окон:

function openedPopup(index) {
  popups[index].classList.add("popup_opened");

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

function closePopup(index) {
  popups[index].classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(0);
};

buttonProfile.addEventListener('click', ()=> openedPopup(0));
buttonCreate.addEventListener('click', ()=> openedPopup(1));
buttonClose[0].addEventListener('click', ()=> closePopup(0));
buttonClose[1].addEventListener('click', ()=> closePopup(1));
formElement[0].addEventListener('submit', handleFormSubmit);

// Лайк карточки:

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_active');
 };

buttonsLike.forEach((function (item) {
  item.addEventListener('click', likeCard);
}));

// Добавление шести карточек:

initialCards.forEach(function (element) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__caption').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.alt;

  cardsLinks.append(cardElement);

  let buttonsLike = document.querySelectorAll('.card__like-button');

  buttonsLike.forEach((function (item) {
    item.addEventListener('click', likeCard);
  }));
});

// Форма добавления карточки:

function handleFormSubmit2(evt) {
  evt.preventDefault();

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__caption').textContent = imgNameInput.value;
  cardElement.querySelector('.card__image').src = imgLinkInput.value;
  cardElement.querySelector('.card__image').alt = imgNameInput.value;

  cardsLinks.prepend(cardElement);

  let buttonsLike = document.querySelectorAll('.card__like-button');

  buttonsLike.forEach((function (item) {
    item.addEventListener('click', likeCard);
  }));

  closePopup(1);
};

formElement[1].addEventListener('submit', handleFormSubmit2);

// Удаление карточки:


