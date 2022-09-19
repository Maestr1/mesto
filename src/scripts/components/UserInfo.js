export class UserInfo {
  constructor(profileName, profileJob, popupProfileEditNameInput, popupProfileEditJobInput) {
    this._profileName = profileName;
    this._profileJob = profileJob;
    this._popupProfileEditNameInput = popupProfileEditNameInput;
    this._popupProfileEditJobInput = popupProfileEditJobInput;
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