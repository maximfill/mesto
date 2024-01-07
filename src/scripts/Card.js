export default class Card {
  constructor({name, link, likes, owner, _id}, userId, templateSelector, handleCardClick, exactlyDelete, likeCardHandler) {  //Конструктор вытаскиваем name, link, likes из ответа сервера
    this._titleCard = name;
    this._linkCard = link;
    this._countLikes = likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._exactlyDelete = exactlyDelete;
    this._userId = userId;
    this._ownerId = owner._id;
    this._cardId = _id;
    this._likeCardHandler = likeCardHandler;
  }

  generateCard() {
    this._template = document.querySelector(this._templateSelector).content;
    this._cardElement = this._template.querySelector('.card').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardText = this._cardElement.querySelector('.card__text');
    this._cardTextPopup = document.querySelector('.popup__image-text');
    this._cardImage.src = this._linkCard;
    this._cardText.textContent = this._titleCard;
    this._likes = this._cardElement.querySelector(".card__number");    

    this._userLikes()
    this._cardButtonBin = this._cardElement.querySelector(".card__bin");
    this._cardButtonLike = this._cardElement.querySelector(".card__likes-number");
    if (this._userId !== this._ownerId) {
      this._cardButtonBin.remove();
    }

    this.renderLikes();

    this._setEventListeners()
    return this._cardElement
  }

  // Получить айди карточки
  getIdCard() {
    return this._cardId;
  }

  // Отрисовать лайки
  renderLikes() {
    this._likes.textContent = this._countLikes.length;
    this._showLikes(this._userId)
  }
  
  // Функция изменения вида лайка
  _showLikes() {
    if (this.likedCard(this._userId)) {
      this._cardButtonLike.classList.add('card__likes-number_active');
    } else {
      this._cardButtonLike.classList.remove('card__likes-number_active');
    }
  }

  // Функция определяет "Есть ли в массиве лайкнувших такой юзер?""
  likedCard() {
    return this._countLikes.some(like => {
      return like._id === this._userId;
    });
  }


  // Метод подставить из ответа сервера кол во лайкнувших в HTML в (под сердечком)
  _userLikes() {
    const number = this._cardElement.querySelector(".card__number");
    number.textContent = this._likes.length;
  }


  // Функция установки количества лайков !!!в свойства карточки!!!
  setLikes(listLikes) {
    this._countLikes = listLikes;
  }
  
  _likeCardHandler() {
    this._cardButtonLike.classList.toggle("card__button_active")
  }
  _deleteCardHandler() {
    this.listCard = this._cardButtonBin.closest('.card');
    this.listCard.remove();
  }

  _setEventListeners() {
    this._cardButtonBin.addEventListener('click', () => {
      this._exactlyDelete()
    }); 

    this._cardButtonLike.addEventListener('click', () => {
      this._likeCardHandler()
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._titleCard, this._linkCard)
    });
  }
      // Удалить карточку 
  deleteCard() {
    this._cardButtonBin.closest('.card').remove();
  }
}