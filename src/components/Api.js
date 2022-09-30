export class Api {
  constructor(options) {
    this._options = options;
  }

  requestUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
      .then(res=>res.json())
      .catch(() => console.log('Ошибка запроса'));
  }
}