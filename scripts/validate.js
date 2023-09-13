
// 8 возможность проверки
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    formList.forEach((form) => {
      setEventListeners(form);
    });
  });
}

  // 6 установить прослушиватели событий
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const popupButtonSave = formElement.querySelector('.popup__button-save');

  toggleButtonState(inputList, popupButtonSave);

// 7  входной список
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {

      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, popupButtonSave);
    });
  });
}

// 5 переключить состояние кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-save_inactive'); // сделать в css модификатор 
  } else {
    buttonElement.classList.remove('popup__button-save_inactive'); // сделать в css модификатор
  }
}

// 4 имеет неверный ввод
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// 3 проверьте достоверность ввода
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// 2 скрыть ошибку ввода
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = ''
};

// 1 показать ошибку ввода
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log( inputElement.id)
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

enableValidation()