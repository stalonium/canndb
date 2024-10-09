import { Component, OnInit } from '@angular/core';
import { StrainService } from '../../services/strain.service';
import { UsageService } from '../../services/usage.service';
import { Strain } from '../../models/strain.model';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <h2>{{ 'DASHBOARD.TITLE' | translate }}</h2>
      <div class="stats">
        <p>{{ 'DASHBOARD.TOTAL_STRAINS' | translate }}: {{ totalStrains }}</p>
        <p>{{ 'DASHBOARD.AVERAGE_DAILY_USE' | translate }}: {{ averageDailyUse }} g</p>
      </div>
      <h3>{{ 'DASHBOARD.RECENT_STRAINS' | translate }}</h3>
      <ul>
        <li *ngFor="let strain of recentStrains">
          {{ strain.name }} - {{ strain.quantity }}g
        </li>
      </ul>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  totalStrains: number = 0;
  averageDailyUse: number = 0;
  recentStrains: Strain[] = [];

  constructor(
    private strainService: StrainService,
    private usageService: UsageService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.strainService.getStrains().subscribe(
      strains => {
        this.totalStrains = strains.length;
        this.recentStrains = strains.slice(0, 5);
      },
      error => console.error('Error loading strains', error)
    );

    this.usageService.getUsageStats().subscribe(
      stats => {
        this.averageDailyUse = stats.averageDailyUse;
      },
      error => console.error('Error loading usage stats', error)
    );
  }
}