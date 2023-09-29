class Card {
  constructor(titleCard, linkCard, templateSelector) {
    this.titleCard = titleCard;
    this.linkCard = linkCard;
    this.templateSelector = templateSelector;
  }

  generateCard() {
    this.template = document.querySelector(this.templateSelector).content;
    this.cardElement = this.template.querySelector('.card').cloneNode(true);
    this.cardImage = this.cardElement.querySelector('.card__image');
    this.cardText = this.cardElement.querySelector('.card__text');

    this.popupBig = document.querySelector(".popup__big");
    this.cardTextPopup = document.querySelector('.popup__image-text');

    this.cardImage.src = this.linkCard;
    this.cardText.textContent = this.titleCard;

    this.cardButtonBin = this.cardElement.querySelector(".card__bin");
    this.cardButtonLike = this.cardElement.querySelector(".card__button");
    this._setEventListeners()
    return this.cardElement
  }
  
  _handleClosePopup() {
    this.popupBig.src = this.linkCard;//попап Биг большой попап3
    this.cardTextPopup.textContent = this.titleCard;
    openPopup(popupImage);
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
      this._handleClosePopup()
    });
  }
}
