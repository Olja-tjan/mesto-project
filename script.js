// Работа модальных окон

const popup = document.querySelector('.popup');
const buttonProfile = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__container-form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');

function openedPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};



function closePopup () {
  popup.classList.remove('popup_opened');
};



function handleFormSubmit(evt) {
  evt.preventDefault();

  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
};

buttonProfile.addEventListener('click', openedPopup);
buttonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

// Добавление шести карточек

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

const cardTemplate = document.querySelector('#card-template').content;
const cardsLinks = document.querySelector('.cards__links');

initialCards.forEach(function (element) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__caption').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.alt;

  cardsLinks.append(cardElement)
});
