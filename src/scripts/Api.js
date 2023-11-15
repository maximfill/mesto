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
      console.log(result);
      return result
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
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
