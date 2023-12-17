export default class Card {
  constructor({name, link, likes, owner, _id}, userId, templateSelector, handleCardClick, exactlyDelete, likeCardHandler) {  //Конструктор вытаскиваем name, link, likes из ответа сервера
    this.titleCard = name;
    this.linkCard = link;
    this._countLikes = likes;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this.exactlyDelete = exactlyDelete;
    this._userId = userId;
    this._ownerId = owner._id;
    this._cardId = _id;
    this.likeCardHandler = likeCardHandler;
  }

  generateCard() {
    this.template = document.querySelector(this.templateSelector).content;
    this.cardElement = this.template.querySelector('.card').cloneNode(true);
    this.cardImage = this.cardElement.querySelector('.card__image');
    this.cardText = this.cardElement.querySelector('.card__text');

    this.cardTextPopup = document.querySelector('.popup__image-text');

    this.cardImage.src = this.linkCard;
    this.cardText.textContent = this.titleCard;
    this._likes =  this.cardElement.querySelector(".card__number");    

    this._alreadyLikeIt()
    this.cardButtonBin = this.cardElement.querySelector(".card__bin");
    this.cardButtonLike = this.cardElement.querySelector(".card__button");
    if (this._userId !== this._ownerId) {
      this.cardButtonBin.remove();
    }

    this.renderLikes();

    this._setEventListeners()
    return this.cardElement
  }

    // Получить айди карточки
    getIdCard() {
      return this._cardId;
    }

     // Отрисовать лайки
  renderLikes() {
    this._likes.textContent = this._countLikes.length;
    this.showLikes(this._userId)
  }
  
  // Функция изменения вида лайка
  showLikes() {
    if (this.likedCard(this._userId)) {
      this.cardButtonLike.classList.add('card__button_active');
    } else {
      this.cardButtonLike.classList.remove('card__button_active');
    }
  }

  // Функция определяет "Есть ли в массиве лайкнувших такой юзер?""
  likedCard() {
    console.log(this._likes, 777777777777)
    return this._countLikes.some(like => {
      return like._id === this._userId;
    });
  }


// Метод подставить из ответа сервера кол во лайкнувших в HTML в (под сердечком)
  _alreadyLikeIt() {
    console.log( this._likes.length , "кол во лайкнувших")
    const number = this.cardElement.querySelector(".card__number");
    number.textContent = this._likes.length;
  }


  // Функция установки количества лайков !!!в свойства карточки!!!
  setLikes(listLikes) {
    this._countLikes = listLikes;
  }
  
  _likeCardHandler() {
    this.cardButtonLike.classList.toggle("card__button_active")
  }
  _deleteCardHandler() {
    this.listCard = this.cardButtonBin.closest('.card');
    this.listCard.remove();
  }

  _setEventListeners() {
    this.cardButtonBin.addEventListener('click', () => {
      this.exactlyDelete()
    }); 

    this.cardButtonLike.addEventListener('click', () => {
      this.likeCardHandler()
    });

    this.cardImage.addEventListener('click', () => {
      this.handleCardClick(this.titleCard, this.linkCard)
    });
  }
  deleteCard() {
    this.listCard = this.cardButtonBin.closest('.card');
    this.listCard.remove();
  }
  
}



