export { renderLoading, checkingStatus, error };

// Изменение кнопок отправки данных

function renderLoading(popup, btnSave, cardButtonSave) {
  if (btnSave === cardButtonSave && btnSave.textContent === 'Сохранение...') {
    btnSave.textContent = 'Создать';
  } else if (btnSave.textContent === 'Сохранение...') {
    btnSave.textContent = 'Сохранить';
  } else {
    btnSave.textContent = 'Сохранение...';
  }
};

// Проверка статуса запроса

function checkingStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function error(err) {
  console.log(err);
}
