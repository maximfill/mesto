import {
  popupBigPictures,
  popupImageText
} from './utils.js'

import Popup from './Popup.js';   // наследование 
export default class PopupWithImage extends Popup {
  constructor(popupSelector, closeButtonSelector) {
    super(popupSelector, closeButtonSelector)
    this._image = this._popup.querySelector(popupBigPictures);
    this._imageText = this._popup.querySelector(popupImageText);
  }
  open(text, link) {    //полиморфизм 
    super.open()
    this._imageText.textContent = text; 
    this._image.src = link;
    this._image.alt = text;
  }
}

