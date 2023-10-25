
const popup = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector('.popup_type_picture');
const popupOpenEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__text");
const nameInput = popup.querySelector(".popup__input_name_name");
const professionInput = popup.querySelector(".popup__input_name_profession");
const popupForm = popup.querySelector(".popup__form");
const popupOpenButtonAdd = document.querySelector(".profile__add-button");
const nameInputAdd = popupAdd.querySelector(".popup__input_name_title");
const linkInputAdd = popupAdd.querySelector(".popup__input_name_link");
const popupFormAdd = popupAdd.querySelector(".popup__form");
const cardPhotos = document.querySelector('.card-photos');
const popupBig = document.querySelector(".popup__big");
const cardTextPopup = document.querySelector('.popup__image-text');
const popupCloseButtons = document.querySelectorAll('.popup__button-close');
const popupPictureSelector = ".popup_type_picture";
const popupAddSelector = ".popup_type_add";
const popupEditSelector = ".popup_type_edit";
const popupButtonSelector = ".popup__button-close";
const popupBigPictures = ".popup__big";
const popupImageText = ".popup__image-text"

export {popup,
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
  cardTextPopup,
  cardPhotos,
  popupBig,
  popupCloseButtons,
  popupPictureSelector,
  popupAddSelector,
  popupEditSelector,
  popupButtonSelector,
  popupBigPictures,
  popupImageText,
}
