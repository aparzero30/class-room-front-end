import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Course } from 'src/interfaces/Course';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient, private service: AuthService) {}

  public getAllCourses(): Observable<Course[]> {
    const url = 'http://localhost:8080/e-classroom/course/forInstructors';
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.service.getSession()
    );

    return this.http.get<Course[]>(url, { headers });
  }

  // public createCourse(name: string) {
  //   const url =
  //     'http://localhost:8080/e-classroom/course/createCourse?courseName=' +
  //     name;
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     'Bearer ' + this.service.getSession()
  //   );

  //   console.log(this.service.getSession());
  //   return this.http.post(url, { headers });
  // }

  public createCourse(courseName: string): Observable<Course> {
    const url = 'http://localhost:8080/e-classroom/course/createCourse';
    const token = this.service.getSession();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const params = new HttpParams().set('courseName', courseName);

    return this.http.post<Course>(url, null, { headers, params });
  }
}
