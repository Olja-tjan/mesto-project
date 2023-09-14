import { checkingStatus } from './utils'
export { userData, cardsData, editProfile, editAva, postCard, addLike, removeLike, removeCard };

// Загрузка информации о пользователе с сервера

const userData =
  fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me', {
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0'
    }
  })
  .then(checkingStatus);

// Загрузка карточек с сервера

const cardsData =
  fetch('https://nomoreparties.co/v1/plus-cohort-28/cards', {
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0'
    }
  })
  .then(checkingStatus);

// Редактирование профиля

function editProfile(nameProfile, aboutProfile) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameProfile,
      about: aboutProfile
    })
  })
  .then(checkingStatus);
};

// Редактирование аватара

function editAva(ava) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: ava
    })
  })
  .then(checkingStatus);
};

// Добавление новой карточки

function postCard(nameCard, linkCard) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/cards', {
    method: 'POST',
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  })
  .then(checkingStatus);
};

// Добавление лайка карточки

function addLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0'
    }
  })
  .then(checkingStatus);
};

// Удаление лайка карточки

function removeLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0'
    }
  })
  .then(checkingStatus);
};

// Удаление карточки

function removeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0'
    }
  })
  .then(checkingStatus);
};
