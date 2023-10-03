import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {settingsForm} from './constants.js'
import {inithialCardsData} from './initial-cards.js'
import {popup,
  popupAdd,
  popupImage,
  popupOpenEditButton,
  profileName,
  profileProfession,
  nameInput,
  professionInput,
  popupForm,
  popupOpenButtonAdd,
  nameInputAdd,
  linkInputAdd,
  popupFormAdd,
  cardPhotos,
  popupCloseButtons,
  openPopup,
  closePopup
} from './utils.js'

popupCloseButtons.forEach(function(button) {
  button.addEventListener('click', closePopup)
});

popupFormAdd.addEventListener("submit", addNewCard);
popupOpenEditButton.addEventListener("click", fillValueForm);
popupForm.addEventListener("submit", formSubmitHandler);
popup.addEventListener("click", overlayPopupClose);
popupAdd.addEventListener("click", overlayPopupClose);
popupImage.addEventListener("click", overlayPopupClose);

popupOpenButtonAdd.addEventListener("click", function() {
  openPopup(popupAdd)
});


// заполнение формы попапа профиля текущими значениями
function fillValueForm() {
  nameInput.value = profileName.textContent
  professionInput.value = profileProfession.textContent
  openPopup(popup)
};

// функция обработчик формы попапа профиля
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value
  profileProfession.textContent = professionInput.value
  closePopup()
};
// функция закрытия попапа при клике вне попапа
function overlayPopupClose(event) {
  if (event.target !== event.currentTarget) {
    return 
  } else { 
    closePopup()
  }
};

document.addEventListener('keydown', function (evt) {
  // Проверяем, была ли нажата esc
    if (evt.code === 'Escape') { 
      closePopup()
  }
});

// cardPhotos.append(card.generateCard())
///функция создает новую карточку когда сохранить в форме
function addNewCard(event) {
  event.preventDefault();
  cardPhotos.prepend(new Card(nameInputAdd.value, linkInputAdd.value, "#card__block").generateCard())
  popupFormAdd.reset()
  closePopup()
};

// открываю попап изображения большой картинки //

// нахожу в 3 попапе (с большой картинкой) крестик закрытия, навешиваю на него слушатель события и переиспользую 
// функцию закрытия (popupToggleImage) 

function createInithialCards() {
  inithialCardsData.forEach(function(card) {
    cardPhotos.prepend(new Card(card.name, card.link, "#card__block").generateCard())
  })
} 
createInithialCards()

const editFormValidator = new FormValidator(settingsForm, popupForm);
editFormValidator.enableValidation()

const addFormValidator = new FormValidator(settingsForm, popupAdd);
addFormValidator.enableValidation()


