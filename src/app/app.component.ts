import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  template: `
    <div [ngClass]="{'dark-mode': isDarkMode}">
      <nav>
        <ul>
          <li><a routerLink="/">{{ 'NAV.HOME' | translate }}</a></li>
          <li><a routerLink="/login">{{ 'NAV.LOGIN' | translate }}</a></li>
          <li><a routerLink="/register">{{ 'NAV.REGISTER' | translate }}</a></li>
          <li><a routerLink="/dashboard">{{ 'NAV.DASHBOARD' | translate }}</a></li>
          <li><a routerLink="/strains">{{ 'NAV.STRAINS' | translate }}</a></li>
          <li><a routerLink="/usage">{{ 'NAV.USAGE' | translate }}</a></li>
          <li><a routerLink="/settings">{{ 'NAV.SETTINGS' | translate }}</a></li>
          <li><a routerLink="/admin">{{ 'NAV.ADMIN' | translate }}</a></li>
        </ul>
      </nav>
      <select (change)="switchLang($event)">
        <option value="en">English</option>
        <option value="de">Deutsch</option>
      </select>
      <button (click)="toggleTheme()">{{ 'THEME.TOGGLE' | translate }}</button>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(
    private translate: TranslateService,
    private themeService: ThemeService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });
  }

  switchLang(event: any) {
    this.translate.use(event.target.value);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}