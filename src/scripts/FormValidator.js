export default class FormValidator {
  constructor (settingsForm, formElement) { 
    this._formSelector = settingsForm.formSelector;
    this._inputSelector = settingsForm.inputSelector;
    this._submitButtonSelector = settingsForm.submitButtonSelector;
    this._inactiveButtonClass = settingsForm.inactiveButtonClass;
    this._inputErrorClass = settingsForm.inputErrorClass;
    this._errorClass = settingsForm.errorClass;
    this._formElement = formElement;
    this._promptErrorSelector = settingsForm.promptErrorSelector;
  }
// 8 возможность проверки
  enableValidation = () => {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault(); //отм пов стан форм 
    });
    this._setEventListeners();
  }
// 5 переключить состояние кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass); // сделать в css модификатор
      buttonElement.removeAttribute('disabled', '');
    }
  }

    // Переключение кнопок джля сброса формы
    _checkSubmitButton() {
      const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      const submitButton = this._formElement.querySelector(this._submitButtonSelector);
      this._toggleButtonState(inputList, submitButton);
    }
    
    // 6 установить прослушиватели событий
  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const popupButtonSave = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, popupButtonSave);

  // 7  входной список
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, popupButtonSave);
      });
    });
  }

  // 4 имеет неверный ввод
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
// 3 проверьте достоверность ввода
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
// 2 скрыть ошибку ввода
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = ''
  };
// 1 показать ошибку ввода
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

   // Переключение кнопок джля сброса формы
  _checkSubmitButton() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, submitButton);
  }

  // Функция для сброса формы
  resetForm() {
    const promtList = Array.from(this._formElement.querySelectorAll(this._promptErrorSelector));
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    promtList.forEach((item) => {
      item.textContent = "";
      item.classList.remove(this._errorClass);
    });
    inputList.forEach((item) => {
      item.classList.remove(this._inputErrorClass);
    })
    console.log(this._formElement)
    this._formElement.reset();
    this._checkSubmitButton();
  }
} 