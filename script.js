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

