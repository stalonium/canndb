import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  template: `
    <div class="landing">
      <h1>{{ 'LANDING.WELCOME' | translate }}</h1>
      <p>{{ 'LANDING.DESCRIPTION' | translate }}</p>
      <button (click)="navigateToLogin()">{{ 'LANDING.LOGIN' | translate }}</button>
      <button (click)="navigateToRegister()">{{ 'LANDING.REGISTER' | translate }}</button>
    </div>
  `
})
export class LandingComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}