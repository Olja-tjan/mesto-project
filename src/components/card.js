export class Card {
  constructor(userId, cardData, templateSelector, { handleCardClick }, { handleLikeClick }, { handleRemoveClick }) {
    this._userId = userId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;
  }


  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }


  // Добавление карточек:

  createCard() {
    this._cardElement = this._getTemplate();
    this._buttonLike = this._cardElement.querySelector('.card__like-button');
    this._buttonTrash = this._cardElement.querySelector('.card__trash-button');
    this._imageCard = this._cardElement.querySelector('.card__image');
    this._counterElement = this._cardElement.querySelector('.card__likes');
    this._caption = this._cardElement.querySelector('.card__caption');

    // Проверка своя ли карточка
    if (this._ownersId !== this._userId) {
      this._buttonTrash.style.display = 'none';
    }

    this._setEventListeners();

    this._counterElement.textContent = this._likes;
    this._caption.textContent = this._name;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;

    return this._cardElement
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardId);
    });
    this._buttonTrash.addEventListener('click', () => {
      this._handleRemoveClick();
    });
    this._imageCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }


  // Удаление карточки

  handleRemoveCard() {
    this._cardElement.remove();
  }


  // Лайк карточки
  // Если id лайка, сопадёт с id пользователя, вернёт true

  checkingLike() {
    return this._likes.some((like) => like._id === this._userId);
  }


  _toggleLike() {
    if (this.checkingLike()) {
      this._like.classList.add('card__like-button_active');
    } else {
      this._like.classList.remove('card__like-button_active');
    }
  }


  updateCounter(amountLikes) {
    this._likes = amountLikes;
    this._counterElement.textContent = this._likes;
    this._toggleLike();
  }
}

