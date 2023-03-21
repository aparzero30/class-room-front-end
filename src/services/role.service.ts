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

  public getCurrentRole(): Observable<Role> {
    const url =
      'https://curiosity-afpm.onrender.com/e-classroom/course/getRole';
    const token = this.service.getSession();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<Role>(url, { headers });
  }

  //SETTING SESSION

  private role_key = 'role_key';

  public setSession(role: Role): void {
    // Convert the course object to a JSON string
    const courseJson = JSON.stringify(role);

    // Store the JSON string in session storage under a key
    sessionStorage.setItem(this.role_key, courseJson);
  }

  public getSession(): Role | null {
    // Retrieve the JSON string from session storage
    const roleJson = sessionStorage.getItem(this.role_key);

    if (roleJson) {
      // If the JSON string exists, parse it back into a course object and return it
      return JSON.parse(roleJson);
    } else {
      // If the JSON string doesn't exist, return null
      return null;
    }
  }
}
