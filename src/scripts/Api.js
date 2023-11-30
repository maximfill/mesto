export default class Api {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Получить данные пользователя
  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
    .then(response => this._checkRequestResult(response))
    .catch(error => this._errorHandler(error));
  }

// Получить начальные карточки
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log(result, 'aaaaaaaaasasasasasassasasasasasasasasa1111111111');
      return result
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }

    // Отредактировать данные пользователя
    editUserInfo(name, profession) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: profession
        })
      })
      .then(response => this._checkRequestResult(response))
      .catch(error => this._errorHandler(error));
    }

    // Добавление новой карточки на сервер с значениями пользователя
    addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(response => this._checkRequestResult(response))
    .catch(error => this._errorHandler(error));
  }



// Проверьте результат запроса
_checkRequestResult(response) {
  if (response.ok) {
    return response.json(); 
  }
  return Promise.reject(`Возникла ошибка: ${response.status}`); 
}
// Обработчик ошибок
_errorHandler(error) {
  console.log(error);
  }
}