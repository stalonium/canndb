import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    this.loadThemePreference();
  }

  toggleTheme() {
    this.isDarkModeSubject.next(!this.isDarkModeSubject.value);
    this.saveThemePreference();
  }

  private loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkModeSubject.next(savedTheme === 'dark');
    } else {
      this.isDarkModeSubject.next(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }

  private saveThemePreference() {
    localStorage.setItem('theme', this.isDarkModeSubject.value ? 'dark' : 'light');
  }
}