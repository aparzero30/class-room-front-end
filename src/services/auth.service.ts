import { Injectable } from '@angular/core';
import { RegisterRequest } from 'src/interfaces/RegisterRequest';
import { AuthenticationRequest } from 'src/interfaces/AuthenticationRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { AuthenticationResponse } from 'src/interfaces/AuthenticationResponse';
import { User } from 'src/interfaces/User';
import { Course } from 'src/interfaces/Course';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // public registerAccount(register: RegisterRequest) {
  //   const url = 'http://localhost:8080/e-classroom/auth/register';
  //   return this.http.post(url, register);
  // }

  // public loginAccount(
  //   login: AuthenticationRequest
  // ): Observable<AuthenticationResponse> {
  //   const url = 'http://localhost:8080/e-classroom/auth/authenticate';
  //   return this.http.post<AuthenticationResponse>(url, login);
  // }

  // public getUser(): Observable<User> {
  //   const url = ' http://localhost:8080/e-classroom/auth/me';
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     'Bearer ' + this.getSession()
  //   );
  //   return this.http.get<User>(url, { headers });
  // }

  //SETTING SESSION

  private sessionKey = 'jwtToken';

  setSession(token: string) {
    sessionStorage.setItem(this.sessionKey, token);
  }

  clearSession() {
    sessionStorage.clear();
  }

  getSession() {
    return sessionStorage.getItem(this.sessionKey);
  }

  //prodcution APIS

  public registerAccount(register: RegisterRequest) {
    const url = 'https://curiosity-afpm.onrender.com/e-classroom/auth/register';
    return this.http.post(url, register);
  }

  public loginAccount(
    login: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    const url =
      'https://curiosity-afpm.onrender.com/e-classroom/auth/authenticate';
    return this.http.post<AuthenticationResponse>(url, login);
  }

  public getUser(): Observable<User> {
    const url = ' https://curiosity-afpm.onrender.com/e-classroom/auth/me';
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.getSession()
    );
    return this.http.get<User>(url, { headers });
  }

  public USER_KEY = 'your_account';

  public storeUSER(user: User): void {
    const userJson = JSON.stringify(user);
    sessionStorage.setItem(this.USER_KEY, userJson);
  }

  public getStoredUser(): User | null {
    // Retrieve the JSON string from session storage
    const userJson = sessionStorage.getItem(this.USER_KEY);

    if (userJson) {
      return JSON.parse(userJson);
    } else {
      return null;
    }
  }
}
