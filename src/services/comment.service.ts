import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comm } from 'src/interfaces/Comm';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private service: AuthService) {}

  // public addComment(msg: string, id: number): Observable<Comm> {
  //   const url = 'http://localhost:8080/e-classroom/comment/addComment';
  //   const token = this.service.getSession();
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  //   const params = new HttpParams().set('msg', msg).set('id', id);
  //   return this.http.post<Comm>(url, null, { headers, params });
  // }

  //production API

  public addComment(msg: string, id: number): Observable<Comm> {
    const url =
      'https://curiosity-afpm.onrender.com/e-classroom/comment/addComment';
    const token = this.service.getSession();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const params = new HttpParams().set('msg', msg).set('id', id);
    return this.http.post<Comm>(url, null, { headers, params });
  }
}
