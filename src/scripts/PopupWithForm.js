import Popup from './Popup.js';
class PopupWithForm extends Popup {
  constructor(popupSelector, closeButtonSelector, submitFormHandler) {
    super(popupSelector, closeButtonSelector);
    this._submitFormHandler = submitFormHandler;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupSubmitButton = this._popupForm.querySelector('.popup__button-save');
    this._defaultSubmitButtonText = this._popupSubmitButton.value;
  }

  _getInputValues() {
    this._inputValuesList = {};
    this._popupForm.querySelectorAll('.popup__input').forEach(item => {
      this._inputValuesList[item.name] = item.value;
    })
  }

  resetWaitSubmitButton() {
    this._popupSubmitButton.value = this._defaultSubmitButtonText;
  }

  resetButtonText() {
    this._popupSubmitButton.value = this._defaultSubmitButtonText;
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close()
    }); 
    this._popupForm.addEventListener('submit', (event) => {
      this._submitFormHandler(event)
    })
  }

  waitSubmitButton(waitingText) {
    this._popupSubmitButton.value = waitingText;
  }
}

export default PopupWithForm;


