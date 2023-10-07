export class UserInfo {
  constructor({ userName, userAbout, userAvatar }) {
    this._userName = document.querySelector(userName);
    this._userAbout = document.querySelector(userAbout);
    this._userAvatar = document.querySelector(userAvatar);
  }


  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    }
  }


  setUserInfo(name, about) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }


  setAvatarInfo(link) {
    this._userAvatar.src = link;
  }
}
