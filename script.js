const profileEditPopup = document.querySelector('.popup_profile-edit');
const cardAddPopup = document.querySelector('.popup_card-add');
const cardZoomPopup = document.querySelector('.popup_card-zoom');
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const profileEditButtonClose = profileEditPopup.querySelector('.popup__button-close');
const cardAddButtonClose = cardAddPopup.querySelector('.popup__button-close');
const cardZoomButtonClose = cardZoomPopup.querySelector('.popup__button-close');
const profileEditForm = profileEditPopup.querySelector('.popup__container-form');
const cardAddForm = cardAddPopup.querySelector('.popup__container-form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const imgNameInput = document.querySelector('#image-name');
const imgLinkInput = document.querySelector('#image-link');
const cardTemplate = document.querySelector('#card-template').content;
const cardsLinks = document.querySelector('.cards__links');
let img = cardZoomPopup.querySelector('.popup__image');
let caption = cardZoomPopup.querySelector('.popup__caption');

// Работа модальных окон:

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
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
  img.src = evt.currentTarget.src;
  img.alt = evt.currentTarget.alt;
  caption.textContent = evt.currentTarget.nextElementSibling.textContent;
  openPopup(cardZoomPopup);
};

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profileEditPopup)
});
cardAddButton.addEventListener('click', () => {
  openPopup(cardAddPopup);
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
profileEditForm.addEventListener('submit', handleFormSubmitProfileEdit);
cardAddForm.addEventListener('submit', handleFormSubmitCardCreate);

// Валидация форм

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button-save_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button-save_inactive');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button-save');

  toggleButtonState(inputList, buttonElement);
  // сделать так, чтобы в изменении профиля кнопка была изначально активной

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container-form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

// Закрытие popup нажатием на оверлей

function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
};

// Закрытие popup нажатием на Esc

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
};
