// const settingsForm = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button-save',
//   inactiveButtonClass: 'popup__button-save_inactive',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error_active'
// };

// 8 возможность проверки
const enableValidation = (settingsForm) => {
  const formList = Array.from(document.querySelectorAll(settingsForm.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    formList.forEach((form) => {
      setEventListeners(form, settingsForm);
    });
  });
}

  // 6 установить прослушиватели событий
const setEventListeners = (formElement, settingsForm) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsForm.inputSelector));
  const popupButtonSave = formElement.querySelector(settingsForm.submitButtonSelector);

  toggleButtonState(inputList, popupButtonSave, settingsForm);

// 7  входной список
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settingsForm);
      toggleButtonState(inputList, popupButtonSave, settingsForm);
    });
  });
}

// 5 переключить состояние кнопки
const toggleButtonState = (inputList, buttonElement, settingsForm) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsForm.inactiveButtonClass); // сделать в css модификатор 
  } else {
    buttonElement.classList.remove(settingsForm.inactiveButtonClass); // сделать в css модификатор
  }
}

// 4 имеет неверный ввод
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// 3 проверьте достоверность ввода
const checkInputValidity = (formElement, inputElement, settingsForm) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsForm);
  } else {
    hideInputError(formElement, inputElement, settingsForm);
  }
};

// 2 скрыть ошибку ввода
const hideInputError = (formElement, inputElement, settingsForm) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settingsForm.inputErrorClass);
  errorElement.classList.remove(settingsForm.errorClass);
  errorElement.textContent = ''
};

// 1 показать ошибку ввода
const showInputError = (formElement, inputElement, errorMessage, settingsForm ) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settingsForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsForm.errorClass);
};

// enableValidation(settingsForm)

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
