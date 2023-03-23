import { Component } from '@angular/core';
import { Role } from 'src/interfaces/Role';
import { CourseService } from 'src/services/course.service';
import { RoleService } from 'src/services/role.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public role!: Role;

  isCuriosity: boolean = false;

  constructor(private rlservice: RoleService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getRole();
    const url = this.route.snapshot.url.join('');
    this.isCuriosity = url.includes('curiosity');
  }

  public getRole(): void {
    this.rlservice.getCurrentRole().subscribe({
      next: (v) => {
        this.role = v;
        this.rlservice.setSession(v);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
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
