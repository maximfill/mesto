const popup = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector('.popup_type_picture');
const popupOpenEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__text");
const nameInput = popup.querySelector(".popup__input_name_name");
const professionInput = popup.querySelector(".popup__input_name_profession");
const popupForm = popup.querySelector(".popup__form");
const popupButtonSaveAdd = popupAdd.querySelector(".popup__button-save");
const popupOpenButtonAdd = document.querySelector(".profile__add-button");
const nameInputAdd = popupAdd.querySelector(".popup__input_name_title");
const linkInputAdd = popupAdd.querySelector(".popup__input_name_link");
const popupFormAdd = popupAdd.querySelector(".popup__form");
const cardPhotos = document.querySelector('.card-photos');
const cardId = document.querySelector('#card__block').content;
const popupBig = document.querySelector(".popup__big");
const cardTextPopup = document.querySelector('.popup__image-text');
const popupCloseButtons = document.querySelectorAll('.popup__button-close');

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

function openPopup(popup) {
  popup.classList.add("popup_opened")
};

function closePopup() {
  const popupOpened = document.querySelector(".popup_opened");
  popupOpened.classList.remove("popup_opened")
};

function fillValueForm() {
  nameInput.value = profileName.textContent
  professionInput.value = profileProfession.textContent
  openPopup(popup)
};

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
///функция создает новую карточку
function addNewCard(event) {
  event.preventDefault();
  renderCard(nameInputAdd.value, linkInputAdd.value);
  popupFormAdd.reset()
  closePopup()
};
// массив изначальных карточек
const inithialCardsData = [
  {
    name: 'Мост',
    link: 'https://images.unsplash.com/photo-1688027882449-5514fc5b1e00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4N3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Сан Франциско',
    link: 'https://images.unsplash.com/photo-1687913161653-7cddb0ba09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Воздушный поцелуй',
    link: 'https://images.unsplash.com/photo-1688079393199-ed1bfa217f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Природа',
    link: 'https://images.unsplash.com/photo-1682687220363-35e4621ed990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw1NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Кафе',
    link: 'https://plus.unsplash.com/premium_photo-1661344206906-ea0b40c65d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Нью Йорк',
    link: 'https://images.unsplash.com/photo-1688103920333-117afda88518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3N3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  }
];
// открываю попап изображения большой картинки //

// нахожу в 3 попапе (с большой картинкой) крестик закрытия, навешиваю на него слушатель события и переиспользую 
// функцию закрытия (popupToggleImage) 

function createInithialCards() {
  inithialCardsData.forEach(function(card) {
    renderCard(card.name, card.link)
  })
}
createInithialCards()

function renderCard(titleCard, linkCard) {
  const cardElement = cardId.querySelector('.card').cloneNode(true);
  const cardButtonLike = cardElement.querySelector(".card__button");
  const cardButtonBin = cardElement.querySelector(".card__bin");
  const cardImage = cardElement.querySelector('.card__image');
  const cardText = cardElement.querySelector('.card__text');
  const cardTextPopup = document.querySelector('.popup__image-text');

  cardImage.src = linkCard;
  cardText.textContent = titleCard;
  cardPhotos.prepend(cardElement);

  // Дополнительный код для открытия/закрытия попапа
  cardImage.addEventListener('click', function() {
    // подставляем изображение в попап//текст подставляем//на крест закрывался)
    popupBig.src = linkCard;//попап Биг большой попап3
    cardTextPopup.textContent = titleCard;
    openPopup(popupImage);
  })
  
  cardButtonBin.addEventListener("click",function() {
    const listCard = cardButtonBin.closest('.card');
    listCard.remove();
  });
  cardButtonLike.addEventListener("click",function() {
    cardButtonLike.classList.toggle("card__button_active")
  });
};

// forEach как работатет он проходится по каждому элем. массива и при каждом вызове forEach передаёт
// функции текущий элемент массива в качестве аргумента т.е cardButtonsBin (урны) передаем в качестве аргумента и на нее
// навешиваю слушатель события и функция/ метод closest находит ближайшего родителя/ метод remove удаляет по клику 
// всю карточку