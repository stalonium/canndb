import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-settings',
  template: `
    <div class="user-settings">
      <h2>{{ 'USER_SETTINGS.TITLE' | translate }}</h2>
      
      <div class="theme-settings">
        <h3>{{ 'USER_SETTINGS.THEME' | translate }}</h3>
        <select [(ngModel)]="selectedTheme" (change)="onThemeChange()">
          <option value="light">{{ 'USER_SETTINGS.LIGHT' | translate }}</option>
          <option value="dark">{{ 'USER_SETTINGS.DARK' | translate }}</option>
          <option value="system">{{ 'USER_SETTINGS.SYSTEM' | translate }}</option>
        </select>
      </div>
      
      <div class="language-settings">
        <h3>{{ 'USER_SETTINGS.LANGUAGE' | translate }}</h3>
        <select [(ngModel)]="selectedLanguage" (change)="onLanguageChange()">
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </select>
      </div>
      
      <div class="account-settings">
        <h3>{{ 'USER_SETTINGS.ACCOUNT' | translate }}</h3>
        <form (ngSubmit)="onSubmit()">
          <div>
            <label for="email">{{ 'USER_SETTINGS.EMAIL' | translate }}</label>
            <input type="email" id="email" [(ngModel)]="email" name="email" required>
          </div>
          <div>
            <label for="newPassword">{{ 'USER_SETTINGS.NEW_PASSWORD' | translate }}</label>
            <input type="password" id="newPassword" [(ngModel)]="newPassword" name="newPassword">
          </div>
          <div>
            <label for="confirmPassword">{{ 'USER_SETTINGS.CONFIRM_PASSWORD' | translate }}</label>
            <input type="password" id="confirmPassword" [(ngModel)]="confirmPassword" name="confirmPassword">
          </div>
          <button type="submit">{{ 'USER_SETTINGS.SAVE' | translate }}</button>
        </form>
      </div>
    </div>
  `
})
export class UserSettingsComponent implements OnInit {
  selectedTheme: string = 'system';
  selectedLanguage: string = 'en';
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.loadUserSettings();
  }

  loadUserSettings() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.email = currentUser.email;
    }
    // Load theme and language preferences from local storage or user settings
    this.selectedTheme = localStorage.getItem('theme') || 'system';
    this.selectedLanguage = this.translateService.currentLang || 'en';
  }

  onThemeChange() {
    if (this.selectedTheme === 'system') {
      this.themeService.loadThemePreference();
    } else {
      this.themeService.setTheme(this.selectedTheme === 'dark');
    }
    localStorage.setItem('theme', this.selectedTheme);
  }

  onLanguageChange() {
    this.translateService.use(this.selectedLanguage);
    localStorage.setItem('language', this.selectedLanguage);
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Update user settings
    this.authService.updateUserSettings(this.email, this.newPassword).subscribe(
      () => {
        alert('Settings updated successfully');
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error => {
        console.error('Error updating user settings', error);
        alert('Failed to update settings');
      }
    );
  }
}