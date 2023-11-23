export default class UserInfo{
  constructor(userNameSelector, userInfoSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo(){
    let userData = {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    }
    return userData
  }

  setUserInfo({name, about}) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
  }
}
