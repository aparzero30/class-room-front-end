import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/interfaces/RegisterRequest';
import { Role } from 'src/interfaces/Role';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerAcc: RegisterRequest = {
    userId: 0,
    name: '',
    email: '',
    password: '',
    role: Role.student,
  };

  constructor(private service: AuthService, private router: Router) {}

  public register(): void {
    this.service.registerAccount(this.registerAcc).subscribe({
      next: (v) => {
        this.router.navigate(['/login']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
}
