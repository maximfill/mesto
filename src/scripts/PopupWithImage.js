import Popup from './Popup.js';   // наследование 
export default class PopupWithImage extends Popup {
  constructor(popupSelector, closeButtonSelector) {
    super(popupSelector, closeButtonSelector)
    this._image = this._popup.querySelector(".popup__big")
    this._imageText = this._popup.querySelector(".popup__image-text")
  }
  open(text, link) {    //полиморфизм 
    this._imageText.textContent = text; 
    this._image.src = link;
    super.open()
  }
}