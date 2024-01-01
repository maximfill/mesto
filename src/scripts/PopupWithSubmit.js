import Popup from "./Popup.js";

class PopupWithSubmit extends Popup { 
  constructor(popupSelector, closeButtonSelector, submitFormHandler) {
    super(popupSelector, closeButtonSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSubmitButton = this._popup.querySelector('.popup__button-save');
    this._defaultSubmitButtonText = this._popupSubmitButton.value;
    this._submitFormHandler = submitFormHandler;
    }

    open(card) {
      this._card = card;
      super.open();
    }

    resetWaitSubmitButton() {
      this._popupSubmitButton.value = this._defaultSubmitButtonText;
    }

    waitSubmitButton(waitingText) {
      this._popupSubmitButton.value = waitingText;
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
