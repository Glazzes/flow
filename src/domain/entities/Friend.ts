export default class Friend {
  username: string;
  email: string;
  profilePicture: string;

  constructor(username: string, email: string, profilePicture: string) {
    this.username = username;
    this.email = email;
    this.profilePicture = profilePicture;
  }
}
