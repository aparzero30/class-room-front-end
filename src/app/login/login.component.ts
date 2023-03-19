import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/interfaces/AuthenticationRequest';
import { AuthService } from 'src/services/auth.service';
import { AuthenticationResponse } from 'src/interfaces/AuthenticationResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginAcc: AuthenticationRequest = {
    email: '',
    password: '',
  };
  constructor(private service: AuthService, private router: Router) {}

  auth!: AuthenticationResponse;
  token!: string;

  ngOnInit(): void {
    this.checkSession();
  }

  public login(): void {
    this.service.loginAccount(this.loginAcc).subscribe({
      next: (v) => {
        this.service.setSession(v.token);
      },
      error: (e) => console.error(e),
      complete: () =>
        console.info('complete', this.router.navigate(['/curiosity'])),
    });
  }

  public checkSession(): void {
    const token = this.service.getSession();
    if (token !== null) {
      this.router.navigate(['/curiosity']);
    }
  }
}
