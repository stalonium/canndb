import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login">
      <h2>{{ 'LOGIN.TITLE' | translate }}</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="username">{{ 'LOGIN.USERNAME' | translate }}</label>
          <input type="text" id="username" [(ngModel)]="username" name="username" required>
        </div>
        <div>
          <label for="password">{{ 'LOGIN.PASSWORD' | translate }}</label>
          <input type="password" id="password" [(ngModel)]="password" name="password" required>
        </div>
        <button type="submit">{{ 'LOGIN.SUBMIT' | translate }}</button>
      </form>
    </div>
  `
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}