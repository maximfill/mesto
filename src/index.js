import Section from './scripts/Section.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import PopupWithForm from './scripts/PopupWithForm.js'
import UserInfo from './scripts/UserInfo.js';
import {settingsForm} from './scripts/constants.js'
import {inithialCardsData} from './scripts/initial-cards.js'
import {
  popup,
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
  popupPictureSelector,
  popupCloseSelector,
  popupAddSelector,
  popupButtonCloseSelector,
  popupEditSelector,
  popupButtonSelector,
  openPopup,
  closePopup
} from './scripts/utils.js'
import './pages/index.css';// добавьте импорт главного файла стилей
import PopupWithImage from './scripts/PopupWithImage.js';

popupCloseButtons.forEach(function(button) {
  button.addEventListener('click', closePopup)
});

popupOpenEditButton.addEventListener("click", fillValueForm);
popupForm.addEventListener("submit", formSubmitHandler);
// popup.addEventListener("click", overlayPopupClose);
// popupAdd.addEventListener("click", overlayPopupClose);
// popupImage.addEventListener("click", overlayPopupClose);
popupOpenButtonAdd.addEventListener("click", function() {
  popupAddCard.open()
});

// заполнение формы попапа профиля текущими значениями
const userInfo = new UserInfo(".profile__title", ".profile__text");
function fillValueForm() {
  const currentInfo = userInfo.getUserInfo();
  nameInput.value = currentInfo.name;
  professionInput.value = currentInfo.info;
  // openPopup(popup)
  popupEditProfile.open() 
};

// функция обработчик формы попапа редактирования профиля
function formSubmitHandler(event) {
  event.preventDefault();

  const info = {
    name: nameInput.value,
    info: professionInput.value
  }
  userInfo.setUserInfo(info);
  popupEditProfile.close()
};

// функция закрытия попапа при клике вне попапа
// function overlayPopupClose(event) {
//   if (event.target !== event.currentTarget) {
//     return 
//   } else { 
//     closePopup()
//   }
// };

// document.addEventListener('keydown', function (evt) {
//   // Проверяем, была ли нажата esc
//     if (evt.code === 'Escape') { 
//       closePopup()
//   }
// });

// cardPhotos.append(card.generateCard())

///функция создает новую карточку когда сохранить в форме
function addNewCard(event) {
  event.preventDefault();
  cardPhotos.prepend(new Card(
    nameInputAdd.value, linkInputAdd.value, "#card__block",
    (name, link) => {
      popupWithImage.open(name, link)
    }
  ).generateCard())
  popupFormAdd.reset()
  popupAddCard.close()
};

const defaultCardGrid = new Section({
  items: inithialCardsData, 
  renderer: (item) => {
    const card = new Card(
      item.name, item.link, "#card__block",
      (name, link) => {
        popupWithImage.open(name, link)
      }
    )
    const cardElement = card.generateCard()
    defaultCardGrid.addItem(cardElement)
  }
}, ".card-photos")
defaultCardGrid.renderItems()
// открываю попап изображения большой картинки //

// нахожу в 3 попапе (с большой картинкой) крестик закрытия, навешиваю на него слушатель события и переиспользую 
// функцию закрытия (popupToggleImage) 

const editFormValidator = new FormValidator(settingsForm, popupForm);
editFormValidator.enableValidation()

const addFormValidator = new FormValidator(settingsForm, popupAdd);
addFormValidator.enableValidation()

const popupWithImage = new PopupWithImage(popupPictureSelector, popupCloseSelector)
popupWithImage.setEventListeners()

const popupAddCard = new PopupWithForm(popupAddSelector, popupButtonCloseSelector, addNewCard)
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditSelector, popupButtonSelector, formSubmitHandler)
popupEditProfile.setEventListeners();
