export class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this.userInfo = {name: this._profileName.textContent, job: this._profileJob.textContent};
    return this.userInfo;
  }

  setUserInfo(formValues) {
    this._profileName.textContent = formValues.profileName;
    this._profileJob.textContent = formValues.profileJob;
  }
}