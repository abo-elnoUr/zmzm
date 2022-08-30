import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost/zmzm/';
  redirectUrl: string = '';
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private _HttpClient: HttpClient) { }

  public login(username: string, password: string) {
    return this._HttpClient
      .post<any>(this.url + 'login.php', { username, password })
      .pipe(
        map((Users) => {
          this.setToken(Users[0].username);
          this.getLoggedInName.emit(true);
          return Users;
        })
      );
  }

  //token
  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  deleteToken() {
    localStorage.removeItem("token");
  }
  isLoggedIn() {
    const usertoken = this.getToken();

    if (usertoken != null) {
      return true;
    }
    return false;
  }
}
