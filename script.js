const profileEditPopup = document.querySelector('.popup_profile-edit');
const cardAddPopup = document.querySelector('.popup_card-add');
const cardZoomPopup = document.querySelector('.popup_card-zoom');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const profileEditButtonClose = profileEditPopup.querySelector('.popup__button-close');
const cardAddButtonClose = cardAddPopup.querySelector('.popup__button-close');
const cardZoomButtonClose = cardZoomPopup.querySelector('.popup__button-close');
const profileEditform = profileEditPopup.querySelector('.popup__container-form');
const cardAddform = cardAddPopup.querySelector('.popup__container-form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const imgNameInput = document.querySelector('#image-name');
const imgLinkInput = document.querySelector('#image-link');
const cardTemplate = document.querySelector('#card-template').content;
const cardsLinks = document.querySelector('.cards__links');
const imagesCards = document.querySelectorAll('.card__image');
const buttonsLike = document.querySelectorAll('.card__like-button');
const buttonsTrash = document.querySelectorAll('.card__trash-button');
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

function openedPopup(popup) {
  popup.classList.add("popup_opened");
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// Отправка формы:

function handleFormSubmitProfileEdit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(profileEditPopup);
};

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
    openedPopup(cardZoomPopup);
  });

  cardElement.querySelector('.card__caption').textContent = txt;
  cardElement.querySelector('.card__image').src = img;
  cardElement.querySelector('.card__image').alt = alt;

  return cardElement
};

function addCard(item) {
  cardsLinks.prepend(item);
};

initialCards.forEach(function (element) {
  const txtEl = element.name;
  const imgEl = element.link;
  const altEl = element.alt;

  const initialCard = createCard(txtEl, imgEl, altEl);
  addCard(initialCard);
});

function handleFormSubmitCardCreate(evt) {
  evt.preventDefault();

  const txtInput = imgNameInput.value;
  const imgInput = imgLinkInput.value;

  const card = createCard(txtInput, imgInput, txtInput);
  addCard(card);
  closePopup(cardAddPopup);
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

// Открытие попапа с картинкой:

function openedPopupImage(evt) {
  let img = cardZoomPopup.querySelector('.popup__image');
  img.src = evt.currentTarget.src;
  img.alt = evt.currentTarget.alt;
  let caption = cardZoomPopup.querySelector('.popup__caption');
  caption.textContent = evt.currentTarget.nextElementSibling.textContent;
};

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openedPopup(profileEditPopup)
});
cardAddButton.addEventListener('click', () => {
  openedPopup(cardAddPopup);
});
profileEditButtonClose.addEventListener('click', () => {
  closePopup(profileEditPopup);
});
cardAddButtonClose.addEventListener('click', () => {
  closePopup(cardAddPopup);
});
cardZoomButtonClose.addEventListener('click', () => {
  closePopup(cardZoomPopup);
});
profileEditform.addEventListener('submit', handleFormSubmitProfileEdit);
cardAddform.addEventListener('submit', handleFormSubmitCardCreate);
buttonsLike.forEach(btn => {
  btn.addEventListener('click', likeCard);
});
buttonsTrash.forEach(btn => {
  btn.addEventListener('click', deletedCard);
});
imagesCards.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    openedPopupImage(evt);
    openedPopup(cardZoomPopup);
  });
});
