export class Api {
  constructor(options) {
    this._options = options;
  }


  requestUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка в requestUserInfo, статус: ${res.status}`);
      })
      .catch((err) => console.log(`Ошибка запроса, код ошибки: ${err.status}`));
  }

  patchUserInfo(formValue) {
    fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: formValue.namee,
        about: formValue.about
      })
    })
      .then(res => {
        if (res.ok) {
          console.log('ok');
        } else {
          console.log(`ERR ${res.status}`);
        }
      })
      .catch(() => console.log('ERR'));
  }

  requestCardList() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

}

