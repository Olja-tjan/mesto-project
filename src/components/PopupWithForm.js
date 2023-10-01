export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__container-form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }


  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value}
    )
    return inputValues;
  }

  // var element = {};
  // // вы определяете element быть простым объектом.
  // // Чтобы добавить новые элементы в обычный объект, используйте этот синтаксис:
  // element[ yourKey ] = yourValue;



  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this.getInputValues());
    })
  }


  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
