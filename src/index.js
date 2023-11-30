import Section from './scripts/Section.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithSubmit from './scripts/PopupWithSubmit.js';
import UserInfo from './scripts/UserInfo.js';
import {settingsForm} from './scripts/constants.js'
import {inithialCardsData} from './scripts/initial-cards.js'
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
  deleteMessageType,
} from './scripts/utils.js'
import './pages/index.css';// добавьте импорт главного файла стилей
import PopupWithImage from './scripts/PopupWithImage.js';

popupOpenEditButton.addEventListener("click", fillValueForm);
popupForm.addEventListener("submit", formSubmitHandler);
popupOpenButtonAdd.addEventListener("click", function() {
  popupAddCard.open()
});


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

// ==Обработчик формы подтверждения удаления==
const formDeleteSubmitHandler = (event) => {
  event.preventDefault();
  console.log('gvvccbnncncncncncncncncncncncncncncncncncncncn')
}

// Попап подтвеждения удаления
const popupConfirm = new PopupWithSubmit(deleteMessageType, popupButtonSelector, formDeleteSubmitHandler )
popupConfirm.setEventListeners();




//    <<<-------------------------------------------------------------------------------------------------------------------------------------------->>>



// Экземпляр Класса для работы с API
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
      const card = new Card(item, "#card__block",
        (name, link) => {
          popupWithImage.open(name, link)
        }, //   3 аргумент безымянная функция, открывает попап 
        () => {
          popupConfirm.open()
        }
      )
      const cardElement = card.generateCard()
      defaultCardGrid.addItem(cardElement)
    }
  }, ".card-photos")
  defaultCardGrid.renderItems()
}


// Обработчик формы попапа редактирования профиля
function formSubmitHandler(event) {
  event.preventDefault();

  const info = {
    name: nameInput.value,
    about: professionInput.value
  }
  console.log(info)
  api.editUserInfo(info.name, info.about)
  userInfo.setUserInfo(info);
  popupEditProfile.close()
};

const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__text");




///функция создает новую карточку когда сохранить в форме (Имя, Ссылка) 
function addNewCard(event) {
  event.preventDefault();
  const nameCard = nameInputAdd.value;
  const linkCard = linkInputAdd.value;
  api.addCard(nameCard, linkCard)
  .then(dataCard=> {
  
    cardPhotos.prepend(new Card(dataCard, "#card__block",
      (name, link) => {
        PopupWithSubmit.open(name, link)
      }
      ).generateCard())
  })
  popupFormAdd.reset()
  popupAddCard.close()
};



// заполнение формы попапа профиля текущими значениями
const userInfo = new UserInfo(".profile__title", ".profile__text");
function fillValueForm() {
  const currentInfo = userInfo.getUserInfo();
  nameInput.value = currentInfo.name;
  professionInput.value = currentInfo.info; 
  popupEditProfile.open() 
};
