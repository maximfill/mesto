import {
  escClose,
}
from './constants'
export default class Popup {
  constructor(popupSelector, closeButtonSelector) {
    this._popup = document.querySelector(popupSelector);// получается мы создаем первым аргументом popupSelector,и ищем его через querySelector но прикол в том что при создании экземпляра 
    this._closeButton = this._popup.querySelector(closeButtonSelector);//там уже другая Переменная  и каждый раз при соз экз мы можем подставляя название аргумента использовать другие переменные

    this._handlerEscClose = this._handlerEscClose.bind(this);
    this._handlerClickOverlay = this._handlerClickOverlay.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened")
    document.addEventListener('keydown', this._handlerEscClose);
    document.addEventListener('click', this._handlerClickOverlay);
    // console.log('Я РАБОТАЮ ИЩИ ДАЛЬШЕ')
  }

  close() {
    this._popup.classList.remove("popup_opened")
    document.removeEventListener('keydown', this._handlerEscClose);
    document.removeEventListener('click', this._handlerClickOverlay);
  
  }

  _handlerClickOverlay(event) {
    if (event.target !== this._popup) return;
    this.close(); 
  }

  _handlerEscClose(evt) {
    if (evt.code === escClose) {
      this.close()
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close()
    }); 
  }
}
