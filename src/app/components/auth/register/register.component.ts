import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="register">
      <h2>{{ 'REGISTER.TITLE' | translate }}</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="username">{{ 'REGISTER.USERNAME' | translate }}</label>
          <input type="text" id="username" [(ngModel)]="username" name="username" required>
        </div>
        <div>
          <label for="email">{{ 'REGISTER.EMAIL' | translate }}</label>
          <input type="email" id="email" [(ngModel)]="email" name="email" required>
        </div>
        <div>
          <label for="password">{{ 'REGISTER.PASSWORD' | translate }}</label>
          <input type="password" id="password" [(ngModel)]="password" name="password" required>
        </div>
        <div>
          <label for="accessToken">{{ 'REGISTER.ACCESS_TOKEN' | translate }}</label>
          <input type="text" id="accessToken" [(ngModel)]="accessToken" name="accessToken" required>
        </div>
        <button type="submit">{{ 'REGISTER.SUBMIT' | translate }}</button>
      </form>
    </div>
  `
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  accessToken: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.accessToken = params['token'] || '';
    });
  }

  onSubmit() {
    this.authService.register(this.username, this.email, this.password, this.accessToken).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}