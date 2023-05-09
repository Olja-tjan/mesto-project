let popup = document.querySelector('.popup');
let buttonProfile = document.querySelector('.profile__edit-button')
let buttonClose = document.querySelector('.popup__button-close')

function openedPopup () {
  popup.classList.add('popup_opened')
};

buttonProfile.addEventListener('click', openedPopup);

function closePopup () {
  popup.classList.remove('popup_opened')
}

buttonClose.addEventListener('click', closePopup);
