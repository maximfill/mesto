class FormValidator {
  constructor (settingsForm, formElement) { 
    this._formSelector = settingsForm.formSelector;
    this._inputSelector = settingsForm.inputSelector;
    this._submitButtonSelector = settingsForm.submitButtonSelector;
    this._inactiveButtonClass = settingsForm.inactiveButtonClass;
    this._inputErrorClass = settingsForm.inputErrorClass;
    this._errorClass = settingsForm.errorClass;
    this._formElement = formElement;
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
    if (this.hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
  } else {
    buttonElement.classList.remove(this._inactiveButtonClass); // сделать в css модификатор
  }
}
    // 6 установить прослушиватели событий
  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const popupButtonSave = this._formElement.querySelector(this._submitButtonSelector);

    toggleButtonState(inputList, popupButtonSave, settingsForm);

  // 7  входной список
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, settingsForm);
        toggleButtonState(inputList, popupButtonSave, settingsForm);
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
_checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    this.showInputError(formElement, inputElement, inputElement.validationMessage, settingsForm);
  } else {
    this.hideInputError(formElement, inputElement, settingsForm);
  }
};
// 2 скрыть ошибку ввода
_hideInputError = (formElement, inputElement, settingsForm) => {
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settingsForm.inputErrorClass);
  errorElement.classList.remove(settingsForm.errorClass);
  errorElement.textContent = ''
};
// 1 показать ошибку ввода
_showInputError = (formElement, inputElement, errorMessage, settingsForm ) => {
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settingsForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsForm.errorClass);
};

} 
// enableValidation(settingsForm)