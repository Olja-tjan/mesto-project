export { renderLoading, error };

// Изменение кнопок отправки данных

function renderLoading(btnSave, btnCreate) {
  if (btnSave === btnCreate && btnSave.textContent === 'Сохранение...') {
    btnSave.textContent = 'Создать';
  } else if (btnSave.textContent === 'Сохранение...') {
    btnSave.textContent = 'Сохранить';
  } else {
    btnSave.textContent = 'Сохранение...';
  }
};

// Проверка статуса запроса

function error(err) {
  console.log(err);
}

// Обработчик клика на кнопку сохранения
formEdit.addEventListener('submit', function (event) {
  event.preventDefault();
  const button = formEdit.querySelector(validationSettings.submitButtonSelector);
  renderLoading(button, 'Сохранение...');
  updateProfileInfo(nameInputEdit.value, descriptionInputEdit.value)
      .then(data => {
          console.log("update:", data);
          profileTitle.textContent = data.name;
          profileSubtitle.textContent = data.about;
      }).catch(error => {
          console.error("Error: ", error)
      }
      ).finally(() => {
          closePopup(popupEdit);
          renderLoading(button, 'Сохранить');
      });

});
