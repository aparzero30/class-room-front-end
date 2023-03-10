import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Discussion } from 'src/interfaces/Discussion';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DiscussionService {
  constructor(private http: HttpClient, private service: AuthService) {}

  public createDiscussion(
    title: string,
    body: string,
    courseId: number
  ): Observable<Discussion> {
    const url = 'http://localhost:8080/e-classroom/discussion/publish';
    const token = this.service.getSession();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const params = new HttpParams()
      .set('title', title)
      .set('body', body)
      .set('courseId', courseId);

    return this.http.post<Discussion>(url, null, { headers, params });
  }

  public getAllDiscussions(courseId: number): Observable<Discussion[]> {
    const url = ' http://localhost:8080/e-classroom/discussion/findAll';
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.service.getSession()
    );
    const params = new HttpParams().set('courseId', courseId);

    // return this.http.get<Discussion[]>(url, null, { headers, params });
    return this.http.get<Discussion[]>(url, { headers, params });
  }

  public SELECTED_DISCUSSION_KEY = 'selectedDiscussion';

  public storeSelectedDiscussion(selectedDiscussion: Discussion): void {
    // Convert the course object to a JSON string
    const discussionJson = JSON.stringify(selectedDiscussion);

    // Store the JSON string in session storage under a key
    sessionStorage.setItem(this.SELECTED_DISCUSSION_KEY, discussionJson);
  }

  public getSelectedDiscussion(): Discussion | null {
    // Retrieve the JSON string from session storage
    const discussionJson = sessionStorage.getItem(this.SELECTED_DISCUSSION_KEY);

    if (discussionJson) {
      // If the JSON string exists, parse it back into a course object and return it
      return JSON.parse(discussionJson);
    } else {
      // If the JSON string doesn't exist, return null
      return null;
    }
  }
}
