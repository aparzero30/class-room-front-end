import { Injectable } from '@angular/core';
import { Role } from 'src/interfaces/Role';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/interfaces/Course';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient, private service: AuthService) {}

  public getAllCoursesForInstructors(): Observable<Course[]> {
    const url =
      'https://curiosity-afpm.onrender.com/e-classroom/course/forInstructors';
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.service.getSession()
    );

    return this.http.get<Course[]>(url, { headers });
  }

  //SETTING SESSION
}
