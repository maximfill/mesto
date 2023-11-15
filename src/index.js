import Section from './scripts/Section.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import PopupWithForm from './scripts/PopupWithForm.js'
import UserInfo from './scripts/UserInfo.js';
import {settingsForm} from './scripts/constants.js'
// import {inithialCardsData} from './scripts/initial-cards.js'
import Api from './scripts/Api.js';
import {
  popupAdd,
  popupOpenEditButton,
  nameInput,
  profileImage,
  professionInput,
  popupForm,
  popupOpenButtonAdd,
  nameInputAdd,
  linkInputAdd,
  popupFormAdd,
  cardPhotos,
  popupPictureSelector,
  popupAddSelector,
  popupEditSelector,
  popupButtonSelector,
  popupBigPictures,
  popupImageText,
} from './scripts/utils.js'
import './pages/index.css';// добавьте импорт главного файла стилей
import PopupWithImage from './scripts/PopupWithImage.js';

popupOpenEditButton.addEventListener("click", fillValueForm);
popupForm.addEventListener("submit", formSubmitHandler);
popupOpenButtonAdd.addEventListener("click", function() {
  popupAddCard.open()
});

// заполнение формы попапа профиля текущими значениями
const userInfo = new UserInfo(".profile__title", ".profile__text");
function fillValueForm() {
  const currentInfo = userInfo.getUserInfo();
  nameInput.value = currentInfo.name;
  professionInput.value = currentInfo.info; 
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


const editFormValidator = new FormValidator(settingsForm, popupForm);
editFormValidator.enableValidation()

const addFormValidator = new FormValidator(settingsForm, popupAdd);
addFormValidator.enableValidation()

const popupWithImage = new PopupWithImage(popupPictureSelector, popupButtonSelector, popupBigPictures, popupImageText)
popupWithImage.setEventListeners()

const popupAddCard = new PopupWithForm(popupAddSelector, popupButtonSelector, addNewCard)
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditSelector, popupButtonSelector, formSubmitHandler)
popupEditProfile.setEventListeners();

// Класс для работы с API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'e8e5e3a7-8ba0-46eb-8d27-e0f2fc68826d',
    'Content-Type': 'application/json'
  }
});

 // Установка данных пользователя в профиль
api.getUserInfo().then((data => {
  profileName.textContent = data.name;
  profileProfession.textContent = data.about;
  profileImage.src = data.avatar;
}));


// Установка начальных карточек
api.getInitialCards().then((cards) => {
  generateInitialCards(cards);
  }
);
// Отобразить все карточки на странице
const generateInitialCards = (cards) => {
  const defaultCardGrid = new Section({
    items: cards, 
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
}

const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__text");