export class UserInfo {
  constructor(profileName, profileJob) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this._popupProfileEditNameInput = document.querySelector( 'input[name=profile-name]');
    this._popupProfileEditJobInput = document.querySelector( 'input[name=profile-job]');
  }

  getUserInfo() {
    this.userInfo = {name: this._profileName.textContent, job: this._profileJob.textContent};
    return this.userInfo;
  }

  setUserInfo() {
    this._profileName.textContent = this._popupProfileEditNameInput.value;
    this._profileJob.textContent = this._popupProfileEditJobInput.value;
  }
}