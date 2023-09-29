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
