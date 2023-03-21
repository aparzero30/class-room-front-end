import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Course } from 'src/interfaces/Course';
import { AuthService } from './auth.service';
import { Role } from 'src/interfaces/Role';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient, private service: AuthService) {}

  // public getAllCoursesForInstructors(): Observable<Course[]> {
  //   const url = 'http://localhost:8080/e-classroom/course/forInstructors';
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     'Bearer ' + this.service.getSession()
  //   );

  //   return this.http.get<Course[]>(url, { headers });
  // }

  // public getCurrentRole(): Observable<Role> {
  //   const url = 'http://localhost:8080/e-classroom/course/getRole';
  //   const token = this.service.getSession();
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  //   return this.http.get<Role>(url, { headers });
  // }

  // public createCourse(courseName: string): Observable<Course> {
  //   const url = 'http://localhost:8080/e-classroom/course/createCourse';
  //   const token = this.service.getSession();
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  //   const params = new HttpParams().set('courseName', courseName);

  //   return this.http.post<Course>(url, null, { headers, params });
  // }

  //FOR STORING COURSE

  public SELECTED_COURSE_KEY = 'selectedCourse';

  public storeSelectedCourse(selectedCourse: Course): void {
    // Convert the course object to a JSON string
    const courseJson = JSON.stringify(selectedCourse);

    // Store the JSON string in session storage under a key
    sessionStorage.setItem(this.SELECTED_COURSE_KEY, courseJson);
  }

  public getSelectedCourse(): Course | null {
    // Retrieve the JSON string from session storage
    const courseJson = sessionStorage.getItem(this.SELECTED_COURSE_KEY);

    if (courseJson) {
      // If the JSON string exists, parse it back into a course object and return it
      return JSON.parse(courseJson);
    } else {
      // If the JSON string doesn't exist, return null
      return null;
    }
  }

  public COURSES_KEY = 'coures_for_you';

  public storeCourses(selectedCourse: Course[]): void {
    const courseJson = JSON.stringify(selectedCourse);
    sessionStorage.setItem(this.COURSES_KEY, courseJson);
  }

  public getCourses(): Course[] | null {
    // Retrieve the JSON string from session storage
    const courseJson = sessionStorage.getItem(this.COURSES_KEY);

    if (courseJson) {
      return JSON.parse(courseJson);
    } else {
      return null;
    }
  }

  //for student

  // public getAllCoursesForStudent(): Observable<Course[]> {
  //   const url = 'http://localhost:8080/e-classroom/course/forStudents';
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     'Bearer ' + this.service.getSession()
  //   );

  //   return this.http.get<Course[]>(url, { headers });
  // }

  //PRODUCTION API

  public getAllCoursesForInstructors(): Observable<Course[]> {
    const url =
      'https://curiosity-afpm.onrender.com/e-classroom/course/forInstructors';
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.service.getSession()
    );

    return this.http.get<Course[]>(url, { headers });
  }

  public getCurrentRole(): Observable<Role> {
    const url =
      'https://curiosity-afpm.onrender.com/e-classroom/course/getRole';
    const token = this.service.getSession();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<Role>(url, { headers });
  }

  public createCourse(courseName: string): Observable<Course> {
    const url =
      'https://curiosity-afpm.onrender.com/e-classroom/course/createCourse';
    const token = this.service.getSession();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const params = new HttpParams().set('courseName', courseName);

    return this.http.post<Course>(url, null, { headers, params });
  }

  public getAllCoursesForStudent(): Observable<Course[]> {
    const url =
      'https://curiosity-afpm.onrender.com/e-classroom/course/forStudents';
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.service.getSession()
    );

    return this.http.get<Course[]>(url, { headers });
  }
}
