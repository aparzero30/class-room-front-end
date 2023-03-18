import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/interfaces/Course';
import { Student } from 'src/interfaces/Student';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient, private service: AuthService) {}

  // public enroll(courseId: number): Observable<Student> {
  //   const url = 'http://localhost:8080/e-classroom/userCourse/enroll';
  //   const token = this.service.getSession();
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  //   const params = new HttpParams().set('courseId', courseId);
  //   return this.http.post<Student>(url, null, { headers, params });
  // }

  public enroll(courseId: number): Observable<Student> {
    const url = 'https://curiosity-afpm.onrender.com';
    const token = this.service.getSession();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const params = new HttpParams().set('courseId', courseId);
    return this.http.post<Student>(url, null, { headers, params });
  }
}
