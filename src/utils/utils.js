export { selectors, error };


const selectors = {
  inputErrorClass: 'popup__input_error',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',

  formSelector: '.popup__container-form',
};


// Проверка статуса запроса

function error(error) {
  console.error("Error: ", error);
}
