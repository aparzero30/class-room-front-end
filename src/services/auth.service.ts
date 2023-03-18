import { Injectable } from '@angular/core';
import { RegisterRequest } from 'src/interfaces/RegisterRequest';
import { AuthenticationRequest } from 'src/interfaces/AuthenticationRequest';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { AuthenticationResponse } from 'src/interfaces/AuthenticationResponse';

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

  private sessionKey = 'jwtToken';

  setSession(token: string) {
    sessionStorage.setItem('jwtToken', token);
  }

  clearSession() {
    sessionStorage.clear();
  }

  getSession() {
    return sessionStorage.getItem('jwtToken');
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
}
