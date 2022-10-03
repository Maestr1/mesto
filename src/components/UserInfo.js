export class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this.userInfo = {name: this._profileName.textContent, about: this._profileJob.textContent};
    return this.userInfo;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about;
  }

  updateUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}
