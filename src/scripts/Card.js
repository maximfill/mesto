export default class Card {
  constructor({name, link, likes}, templateSelector, handleCardClick, exactlyDelete) {  //Конструктор вытаскиваем name, link, likes из ответа сервера
    this.titleCard = name;
    this.linkCard = link;
    this.likes = likes;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this.exactlyDelete = exactlyDelete;
  }

  generateCard() {
    this.template = document.querySelector(this.templateSelector).content;
    this.cardElement = this.template.querySelector('.card').cloneNode(true);
    this.cardImage = this.cardElement.querySelector('.card__image');
    this.cardText = this.cardElement.querySelector('.card__text');

    this.cardTextPopup = document.querySelector('.popup__image-text');

    this.cardImage.src = this.linkCard;
    this.cardText.textContent = this.titleCard;

    this._alreadyLikeIt()
    this.cardButtonBin = this.cardElement.querySelector(".card__bin");
    this.cardButtonLike = this.cardElement.querySelector(".card__button");
    
    this._setEventListeners()
    return this.cardElement
  }
// Метод подставить из ответа сервера кол во лайкнувших в HTML в (под сердечком)
  _alreadyLikeIt() {
    console.log( this.likes.length , "ммммммммм")
    const number = this.cardElement.querySelector(".card__number");
    number.textContent = this.likes.length;
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
      this._likeCardHandler()
    });

    this.cardImage.addEventListener('click', () => {
      this.handleCardClick(this.titleCard, this.linkCard)
    });
  }
  
}



