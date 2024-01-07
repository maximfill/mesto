import Section from './scripts/Section.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithSubmit from './scripts/PopupWithSubmit.js';
import UserInfo from './scripts/UserInfo.js';
import {settingsForm} from './scripts/constants.js'
import Api from './scripts/Api.js';
import {
  popupAdd,
  popupOpenEditButton,
  nameInput,
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
  userId,
  popupSelector,
  popupAvatarInput,
  popupFormAvatar,
  profileAvatar,
} from './scripts/utils.js'
import './pages/index.css';// добавьте импорт главного файла стилей
import PopupWithImage from './scripts/PopupWithImage.js';

// слушатель события открытие попапа редактирования профиля
popupOpenEditButton.addEventListener("click", fillValueForm)

popupForm.addEventListener("submit", formSubmitHandler);

popupOpenButtonAdd.addEventListener("click", function() {
  addFormValidator.resetForm()
  popupAddCard.open()
  popupAddCard.resetWaitSubmitButton();
});

// попап редактирования аватара 
profileAvatar.addEventListener("click",function() {
  popupEditAvatar.resetButtonText()
  popupEditAvatarForms.resetForm() 
  popupEditAvatar.open()
  
});

// ==Обработчик формы редактирования аватара==
const formEditAvatarSubmitHandler = (event) => {
  event.preventDefault();
  profileAvatar.src = popupAvatarInput.value;
  popupEditAvatar.waitSubmitButton('Сохранение...');
  
  api.editUserAvatar(popupAvatarInput.value)
    .finally(() => {
      popupEditAvatar.close();
    });
}

// ==Обработчик формы подтверждения удаления==
const formDeleteSubmitHandler = (event, card) => {
  event.preventDefault();

  popupConfirm.waitSubmitButton('Удаление...');
  api.deleteCard(card.getIdCard())
    .then(response => {
      card.deleteCard();
    }).finally(() => {
      popupConfirm.close();
      popupConfirm.resetWaitSubmitButton();
    })
}

const editFormValidator = new FormValidator(settingsForm, popupForm);
editFormValidator.enableValidation() //создаются экз и вызывается этот метод

const addFormValidator  = new FormValidator(settingsForm, popupFormAdd);
addFormValidator.enableValidation()

const popupWithImage = new PopupWithImage(popupPictureSelector, popupButtonSelector, popupBigPictures, popupImageText)
popupWithImage.setEventListeners()

const popupAddCard = new PopupWithForm(popupAddSelector, popupButtonSelector, addNewCard) // экземпляр класса PopupWithForm, для добавить новую карточку
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditSelector, popupButtonSelector, formSubmitHandler)
popupEditProfile.setEventListeners();

// Попап редактирования аватара
const popupEditAvatar = new PopupWithForm(popupSelector, popupButtonSelector, formEditAvatarSubmitHandler)
popupEditAvatar.setEventListeners();

const popupEditAvatarForms = new FormValidator(settingsForm, popupFormAvatar);
popupEditAvatarForms.enableValidation();


// Попап подтвеждения удаления
const popupConfirm = new PopupWithSubmit(deleteMessageType, popupButtonSelector, 
  (event, card) => { // Здесь начинается К О Л Л Б Э К функция, которая вызывает сама себя. Или функция которая должна быть выполнена после другой.
    formDeleteSubmitHandler(event, card)
  }
)
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
  profileAvatar.src = data.avatar;
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
      const card = new Card(item, userId, "#card__block",
        (name, link) => {
          popupWithImage.open(name, link)
        },
        //   3 аргумент безымянная функция, открывает попап 
        () => {
          popupConfirm.open(card)
        },
        () => {
          const likedCard = card.likedCard();
          const resultApi = likedCard ? api.unlikeCard(card.getIdCard()) : api.likeCard(card.getIdCard());
          resultApi.then(data => {
              card.setLikes(data.likes) // Обновляем список лайкнувших карточку
              card.renderLikes(); // Отрисовываем на клиенте
          });
        },
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
  popupEditProfile.waitSubmitButton('Сохранение...');
  const info = {
    name: nameInput.value,
    about: professionInput.value
  }

  api.editUserInfo(info.name, info.about)
    .finally(() => {
      popupEditProfile.close();
    });
  userInfo.setUserInfo(info);
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
    console.log(dataCard)
    const card = new Card(dataCard, userId, "#card__block",
      (name, link) => {
        PopupWithSubmit.open(name, link)
      },
        //   3 аргумент безымянная функция, открывает попап 
      () => {
        popupConfirm.open(card)
      },
      () => {
        const likedCard = card.likedCard();
        const resultApi = likedCard ? api.unlikeCard(card.getIdCard()) : api.likeCard(card.getIdCard());
          resultApi.then(data => {
            card.setLikes(data.likes) // Обновляем список лайкнувших карточку
            card.renderLikes(); // Отрисовываем на клиенте
          });
      },
    )
    const cardElement = card.generateCard()
    cardPhotos.prepend((cardElement))
  })
  popupFormAdd.reset()
  popupAddCard.close()
};

// ОБРАБОТЧИК ОТКРЫТИЯ ПОПАПА РЕДАКТИРОВАНИЯ
const userInfo = new UserInfo(".profile__title", ".profile__text");
function fillValueForm() {
  const currentInfo = userInfo.getUserInfo();
  nameInput.value = currentInfo.name;
  professionInput.value = currentInfo.info; 
  popupEditProfile.open() 
  popupEditProfile.resetButtonText() // обнуление текста при открытие попапа
  editFormValidator.resetForm() //Функция для сброса формы
};
