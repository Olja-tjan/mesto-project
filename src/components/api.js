import { createCard, addCard, countLikes, deleteCard } from './card';
export { profileName, profileDescription, profileAvatar, editProfile, editAva, postCard, plusLike, minusLike, promiseDeleteCard };

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');

// Загрузка информации о пользователе с сервера

const userData = new Promise((resolve, reject) => {
  fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me', {
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0'
    }
  })
    .then(res => {
      resolve(res.json());
      reject(`Ошибка: ${res.status}`);
    })
});

// Загрузка карточек с сервера

const cardsData = new Promise((resolve, reject) => {
  fetch('https://nomoreparties.co/v1/plus-cohort-28/cards', {
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0'
    }
  })
    .then(res => {
      resolve(res.json());
      reject(`Ошибка: ${res.status}`);
    })
});

// Обработка данных с сервера

Promise.all([userData, cardsData])
  .then(data => {
    const userId = data[0]._id;
    profileName.textContent = data[0].name;
    profileDescription.textContent = data[0].about;
    profileAvatar.src = data[0].avatar;

    data[1].forEach(function (el) {
      const otherLikes = el.likes.length;
      const initialCard = createCard(el.name, el.link, el.name, otherLikes, el._id, el.owner._id, userId);
      addCard(initialCard);
      el.likes.forEach(function (elLike) {
        if (elLike._id === userId) {
          const buttonLike = document.getElementById(el._id).querySelector('.card__like-button');
          buttonLike.classList.add('card__like-button_active');
        }
      });
    });
  });

// Редактирование профиля

function editProfile(nameProfile, aboutProfile) {
  fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me', {
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};

// Редактирование аватара

function editAva(ava) {
  fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: ava
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};

// Добавление новой карточки

function postCard(nameCard, linkCard) {
  fetch('https://nomoreparties.co/v1/plus-cohort-28/cards', {
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      const otherLikes = data.likes.length;
      const card = createCard(data.name, data.link, data.name, otherLikes, data._id, data.owner._id, data.owner._id);
      addCard(card);
    });
};

// Добавление лайка карточки

function plusLike(cardId, counterElement) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      countLikes(counterElement, data.likes.length);
    });
};

// Удаление лайка карточки

function minusLike(cardId, counterElement) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      countLikes(counterElement, data.likes.length);
    });
};

// Удаление карточки

function promiseDeleteCard(cardId) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ef5df4b1-0580-4314-b10f-2fd4a208efc0'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  deleteCard(cardId);
};
