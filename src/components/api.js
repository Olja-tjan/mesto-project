export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkingStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  // Загрузка информации о пользователе с сервера

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkingStatus)
  }


  // Загрузка карточек с сервера

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkingStatus)
  }


  // Редактирование профиля

  editUserInfo(nameProfile, aboutProfile) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: nameProfile,
        about: aboutProfile
      })
    })
      .then(this._checkingStatus);
  }


  // Редактирование аватара

  editAvatar(ava) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: ava
      })
    })
      .then(this._checkingStatus)
  }


  // Добавление новой карточки

  addCard(nameCard, linkCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: nameCard,
        link: linkCard
      })
    })
      .then(this._checkingStatus);
  }


  // Удаление карточки

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkingStatus);
  }


  // Добавление лайка карточки

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkingStatus);
  }


  // Удаление лайка карточки

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkingStatus);
  }
}



// в index.js:

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
});
