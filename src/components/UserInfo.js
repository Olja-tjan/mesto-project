export class UserInfo {
    constructor ({userName, userAbout, userAvatar}) {
      this._userName = document.querySelector(userName);
      this._userAbout = document.querySelector(userAbout);
      this._userAvatar = document.querySelector(userAvatar);
    }


getUserInfo() {
}

setUserInfo(name, about, avatar) {
  this._userName.textContent = name;
  this._userAbout.textContent = about;
  this._userAvatar.src = avatar;
}

}


// Обработка данных с сервера

function setUserInfo(userInfo) {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
};

function renderItems(cardInfo, userId) {
  cardInfo.forEach(function (el) {
    const initialCard = createCard(el.name, el.link, el.name, el.likes, el._id, el.owner._id, userId);
    addCard(initialCard);
  });
};

Promise.all([userData, cardsData])
  .then(data => {
    console.log(data[1]);
    const userId = data[0]._id;
    setUserInfo(data[0]);
    renderItems(data[1], userId);
    console.log(data[1]);
  })
  .catch(error);

// Отправка формы профиля

function handleFormSubmitProfileEdit(evt) {
  evt.preventDefault();

  editProfile(profileName.textContent = nameInput.value, profileDescription.textContent = jobInput.value)
    .then(() => closePopup(profileEditPopup))
    .then(() => renderLoading(profileButtonSave))
    .catch(error);
};

// Отправка формы аватара

function handleFormSubmitAvaEdit(evt) {
  evt.preventDefault();

  editAva(profileAvatar.src = avaInput.value)
    .then(() => closePopup(avaEditPopup))
    .then(() => renderLoading(avaButtonSave))
    .catch(error);
};
