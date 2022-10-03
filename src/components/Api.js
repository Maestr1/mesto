export class Api {
  constructor(options) {
    this._options = options;
  }

//Метод для проверки ответа сервера
  _onResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка запроса. Код ошибки: ${res.status}`);
    }
  }

//Запрос данных пользователя
  requestUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
      .then(res => this._onResponse(res));
  }

//Изменение данных пользоваьеля
  patchUserInfo(formValue) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: formValue.name,
        about: formValue.about
      })
    })
      .then(res => this._onResponse(res));
  }

  patchUserAvatar(formValue) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: formValue.link
      })
    })
      .then(res => this._onResponse(res));
  }

  //Запрос списка карточек
  requestCardList() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
      .then(res => this._onResponse(res))
      .catch(err => console.log(`Ошибка, не получен список карточек. Текст ошибки: ${err}`));
  }

  //Отправка новой корточки на сервер
  postCard(formValue) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: formValue.placeName,
        link: formValue.placeLink
      })
    })
      .then(res => this._onResponse(res));
  }

  //Удаление карточки с сервера
  removeCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then(res => this._onResponse(res));
  }

  //Поставить/снять лайк
  putLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._options.headers
    })
      .then(res => this._onResponse(res));
  }

  removeLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then(res => this._onResponse(res));

  }
}

