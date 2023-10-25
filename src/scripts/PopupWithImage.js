import Popup from './Popup.js';   // наследование 
export default class PopupWithImage extends Popup {
  constructor(popupSelector, closeButtonSelector, popupBig, popupImage) {
    super(popupSelector, closeButtonSelector)
    this._image = this._popup.querySelector(popupBig);
    this._imageText = this._popup.querySelector(popupImage);
  }
  open(text, link) {    //полиморфизм 
    super.open()
    this._imageText.textContent = text; 
    this._image.src = link;
    this._image.alt = text;
  }
}

