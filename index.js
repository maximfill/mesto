const popup = document.querySelector(".popup");
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

function formSubmitHander(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value
  profileProfession.textContent = professionInput.value
  popupToggle()
}

function overlayPopupClose(event){
  if (event.target !== event.currentTarget){
    return 
  } else { 
    popupToggle()
  }
}

popupOpenEditButton.addEventListener("click", fillValueForm);
popupCloseEditButton.addEventListener("click", popupToggle);
popupForm.addEventListener("submit", formSubmitHander);
popup.addEventListener("click", overlayPopupClose);



