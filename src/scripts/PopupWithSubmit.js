import Popup from "./Popup.js";

class PopupWithSubmit extends Popup { 
  constructor(popupSelector, closeButtonSelector, submitFormHandler) {
    super(popupSelector, closeButtonSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButtonSelector = this._popup.querySelector('.popup__button-save');
    this._defaultSubmitButtonText = this._submitButtonSelector.value;
    this._submitFormHandler = submitFormHandler;
    }

    open(card) {
      this._card = card;
      super.open();
    }

    setEventListeners() {
      this._closeButton.addEventListener('click', () => {
        this.close()
      }); 
      this._popupForm.addEventListener('submit', (event) => {
        this._submitFormHandler(event, this._card)
      })
    }
  }
  export default PopupWithSubmit;
