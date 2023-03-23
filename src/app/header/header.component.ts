import { Component } from '@angular/core';
import { Role } from 'src/interfaces/Role';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/interfaces/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public role!: Role;

  isCuriosity: boolean = false;

  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getRole();
    const url = this.route.snapshot.url.join('');
    this.isCuriosity = url.includes('curiosity');
  }

  public getRole(): void {
    const me: User | null = this.auth.getStoredUser();
    if (me !== null) {
      this.role = me.role;
    }
  }
  public createCourse(): void {
    let formId = 'studentfrm';
    if (this.role === 'instructor') {
      formId = 'instructorfrm';
    }
    const myDiv = document.getElementById('box-wrapper');

    if (myDiv) {
      myDiv.style.pointerEvents = 'none';
      myDiv.style.opacity = '0';
    }

    const myElement = document.getElementById(formId);

    if (myElement) {
      if (window.innerWidth < 500) {
        myElement.style.height = '30vh';
        myElement.style.width = '95vw';
      } else {
        myElement.style.height = '30vh';
      }

      myElement.style.boxShadow = '5px 5px 5px 5px rgba(0, 0, 0, 0.2)';
    }
  }
}
