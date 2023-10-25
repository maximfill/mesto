export default class Card {
  constructor(titleCard, linkCard, templateSelector, handleCardClick) {
    this.titleCard = titleCard;
    this.linkCard = linkCard;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  generateCard() {
    this.template = document.querySelector(this.templateSelector).content;
    this.cardElement = this.template.querySelector('.card').cloneNode(true);
    this.cardImage = this.cardElement.querySelector('.card__image');
    this.cardText = this.cardElement.querySelector('.card__text');

    this.cardTextPopup = document.querySelector('.popup__image-text');

    this.cardImage.src = this.linkCard;
    this.cardText.textContent = this.titleCard;

    this.cardButtonBin = this.cardElement.querySelector(".card__bin");
    this.cardButtonLike = this.cardElement.querySelector(".card__button");
    this._setEventListeners()
    return this.cardElement
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
      this._deleteCardHandler()
    }); 

    this.cardButtonLike.addEventListener('click', () => {
      this._likeCardHandler()
    });

    this.cardImage.addEventListener('click', () => {
      this.handleCardClick(this.titleCard, this.linkCard)
    });
  }
}



