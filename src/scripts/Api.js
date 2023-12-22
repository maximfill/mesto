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
      console.log(result, 'НАЧАЛЬНЫЕ КАРТОЧКИ');
      return result
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }

  
  // Удалить карточку
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(response => this._checkRequestResult(response))
    .then(()=>{
      console.log('API')
    })
    .catch(error => this._errorHandler(error));

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


  
  // Постановка лайка карточке
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(response => this._checkRequestResult(response))
    .catch(error => this._errorHandler(error));
  }

  // Удаление лайка карточке
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(response => this._checkRequestResult(response))
    .catch(error => this._errorHandler(error));
  }


  // Отредактировать аватар пользователя
  editUserAvatar(urlAvatar) {
    console.log(urlAvatar);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: urlAvatar
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