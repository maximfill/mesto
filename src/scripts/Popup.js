export default class Popup {
  constructor(popupSelector, closeButtonSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector);
  }

  open() {
    this._popup.classList.add("popup_opened")
  }

  close() {
    this._popup.classList.remove("popup_opened")
  }

  _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close()
    }); 

  }
}