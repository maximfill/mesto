const popup = document.querySelector(".popup_type_edit");
const popupOpenEditButton = document.querySelector(".profile__edit-button");
const popupCloseEditButton = document.querySelector(".popup__button-close");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__text");
const nameInput = popup.querySelector(".popup__input_name_name");
const professionInput = popup.querySelector(".popup__input_name_profession");
const popupForm = popup.querySelector(".popup__form");

function popupToggle() {
  popup.classList.toggle("popup_opened")
}

function fillValueForm() {
  nameInput.value = profileName.textContent
  professionInput.value = profileProfession.textContent
  popupToggle()
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value
  profileProfession.textContent = professionInput.value
  popupToggle()
}
// функция закрытия попапа при клике вне попапа
function overlayPopupClose(event){
  if (event.target !== event.currentTarget){
    return 
  } else { 
    popupToggle()
  }
}

const popupAdd = document.querySelector(".popup_type_add");
const popupOpenButtonAdd = document.querySelector(".profile__add-button");
const popupCloseButtonAdd = popupAdd.querySelector(".popup__button-close");
const nameInputAdd = popupAdd.querySelector(".popup__input_name_title");
const linkInputAdd = popupAdd.querySelector(".popup__input_name_link");
const popupFormAdd = popupAdd.querySelector(".popup__form");
const popupbuttonsaveAdd = popupAdd.querySelector(".popup__button-save");

popupbuttonsaveAdd.addEventListener("click",popupToggleAdd);
popupOpenButtonAdd.addEventListener("click",popupToggleAdd);
function popupToggleAdd() {
  popupAdd.classList.toggle("popup_opened")
}
popupCloseButtonAdd.addEventListener("click",popupToggleAdd);

popupFormAdd.addEventListener("submit",buttonsaveAdd);

// !!!    !!!    !!!   функция создает новую карточку
function buttonsaveAdd(event) {
  event.preventDefault();
  const cardId = document.querySelector('#card__block').content;
  const cardPhotos = document.querySelector('.card-photos');
  
  // клонируем содержимое тега template
  const cardElement = cardId.querySelector('.card').cloneNode(true);
  const cardButtonLike = cardElement.querySelector(".card__button");
  // переменная для 1 урны
  const cardButtonBin = cardElement.querySelector(".card__bin");

  const cardImage = cardElement.querySelector('.card__image');
  const cardTextPopap = document.querySelector('.popup__image-text');
  cardImage.addEventListener('click',function(){
    const popupBig = document.querySelector(".popup__big");
    // подставляем изображение в попап//текст подставляем//на крест закрывался)
    popupBig.src = linkInputAdd.value;//попап Биг большой попап3
    cardTextPopap.textContent = nameInputAdd.value;
    popupToggleImage()
  });
  
  // наполняем содержимым
  cardElement.querySelector('.card__text').textContent = nameInputAdd.value;
  cardElement.querySelector('.card__image').src = linkInputAdd.value;
  
  cardPhotos.prepend(cardElement);

  // НАвешивание слуш на кнопка лайка
  cardButtonLike.addEventListener("click",function(){
    cardButtonLike.classList.toggle("card__button_active")
  })
  ////навешиваю слушатель события и функция/ метод closest находит ближайшего родителя/ метод remove удаляет по клику всю карточку
  cardButtonBin.addEventListener("click",function(){
    const listCard = cardButtonBin.closest('.card');
    listCard.remove();
  })
}


// массив изначальных карточек
const cardlink = [
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

const popupImage = document.querySelector('.popup_type_picture');
// нахожу в 3 попапе (с большой картинкой) крестик закрытия, навешиваю на него слушатель события и переиспользую 
// функцию закрытия (popupToggleImage) 
const popupButtonClose = popupImage.querySelector('.popup__button-close');
popupButtonClose.addEventListener('click',popupToggleImage);
// функция откр и закрытия попапа картинки //
function popupToggleImage() {
  popupImage.classList.toggle("popup_opened");
}

function creatingCards(){
  cardlink.forEach(function(card){
    const cardId = document.querySelector('#card__block').content;
    const cardPhotos = document.querySelector('.card-photos');
    // клонируем содержимое тега template
    const cardElement = cardId.querySelector('.card').cloneNode(true);
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ищем картинку в новой карточке / добавляем слушатель клика /
    const cardImage = cardElement.querySelector('.card__image');
    const cardTextPopap = document.querySelector('.popup__image-text');

  cardImage.addEventListener("click",function(){
    const popupBig = document.querySelector(".popup__big");
    popupBig.src = card.link;
    cardTextPopap.textContent = card.name;
    popupToggleImage()
  });
    // наполняем содержимым
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__text').textContent = card.name;
    cardPhotos.prepend(cardElement);
  })
}
creatingCards()

popupOpenEditButton.addEventListener("click", fillValueForm);
popupCloseEditButton.addEventListener("click", popupToggle);
popupForm.addEventListener("submit", formSubmitHandler);
popup.addEventListener("click", overlayPopupClose);

// НАвешивание слуш на кнопки лайков
const cardButtonsLike = document.querySelectorAll(".card__button");

cardButtonsLike.forEach(function(item){
  item.addEventListener("click",function(){
    item.classList.toggle("card__button_active")
  });
})

// переменная для урны удалить
const cardButtonsBin = document.querySelectorAll(".card__bin");


// forEach как работатет он проходится по каждому элем. массива и при каждом вызове forEach передаёт
// функции текущий элемент массива в качестве аргумента т.е cardButtonsBin (урны) передаем в качестве аргумента и на нее
// навешиваю слушатель события и функция/ метод closest находит ближайшего родителя/ метод remove удаляет по клику 
// всю карточку

cardButtonsBin.forEach(function(item){
  item.addEventListener("click",function () {
    const listCard = item.closest('.card');
    listCard.remove();
  });
});



