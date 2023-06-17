const popups = document.querySelectorAll('.popup');
const buttonProfile = document.querySelector('.profile__edit-button');
const buttonCreate = document.querySelector('.profile__add-button');
const buttonsClose = document.querySelectorAll('.popup__button-close');
const formsElements = document.querySelectorAll('.popup__container-form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const imgNameInput = document.querySelector('#image-name');
const imgLinkInput = document.querySelector('#image-link');
const cardTemplate = document.querySelector('#card-template').content;
const cardsLinks = document.querySelector('.cards__links');
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

// Отправка формы:

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(0);
};

// Добавление карточек:

function createCard(txt, img, alt) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__caption').textContent = txt;
  cardElement.querySelector('.card__image').src = img;
  cardElement.querySelector('.card__image').alt = alt;

  cardsLinks.prepend(cardElement);
};

initialCards.forEach(function (element) {
  const txtEl = element.name;
  const imgEl = element.link;
  const altEl = element.alt;

  createCard(txtEl, imgEl, altEl);
});

function handleFormSubmitCreateCard(evt) {
  evt.preventDefault();

  const txtInput = imgNameInput.value;
  const imgInput = imgLinkInput.value;

  createCard(txtInput, imgInput, txtInput);

  const buttonsLike = document.querySelectorAll('.card__like-button');

  buttonsLike.forEach((function (item) {
    item.addEventListener('click', likeCard);
  }));

  deletedCard();
  openedPopupImage();
  closePopup(1);
};

// Лайк карточки:

const buttonsLike = document.querySelectorAll('.card__like-button');

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_active');
};

buttonsLike.forEach((function (item) {
  item.addEventListener('click', likeCard);
}));

// Удаление карточки:

function deletedCard() {
  const buttonsTrash = document.querySelectorAll('.card__trash-button');

  buttonsTrash.forEach(btn => {
    btn.addEventListener('click', () => {
      const cardItem = btn.closest('.card');
      cardItem.parentNode.removeChild(cardItem);
    });
  });
};

// Открытие попапа с картинкой:

function openedPopupImage() {
  const imagesCards = document.querySelectorAll('.card__image');

  imagesCards.forEach((function (image) {
    image.addEventListener('click', (evt) => {
      openedPopup(2);
      let img = document.querySelector('.popup__image');
      img.src = evt.currentTarget.src;
      let caption = document.querySelector('.popup__caption');
      caption.textContent = evt.currentTarget.nextElementSibling.textContent;
    });
  }));
};

buttonProfile.addEventListener('click', () => openedPopup(0));
buttonCreate.addEventListener('click', () => openedPopup(1));
buttonsClose[0].addEventListener('click', () => closePopup(0));
buttonsClose[1].addEventListener('click', () => closePopup(1));
buttonsClose[2].addEventListener('click', () => closePopup(2));
formsElements[0].addEventListener('submit', handleFormSubmit);
formsElements[1].addEventListener('submit', handleFormSubmitCreateCard);
deletedCard();
openedPopupImage();
