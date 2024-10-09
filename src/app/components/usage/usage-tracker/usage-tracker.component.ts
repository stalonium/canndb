import { Component, OnInit } from '@angular/core';
import { UsageService } from '../../../services/usage.service';
import { StrainService } from '../../../services/strain.service';
import { Strain } from '../../../models/strain.model';

@Component({
  selector: 'app-usage-tracker',
  template: `
    <div class="usage-tracker">
      <h2>{{ 'USAGE_TRACKER.TITLE' | translate }}</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="strain">{{ 'USAGE_TRACKER.STRAIN' | translate }}</label>
          <select id="strain" [(ngModel)]="selectedStrainId" name="strain" required>
            <option *ngFor="let strain of strains" [value]="strain.id">{{ strain.name }}</option>
          </select>
        </div>
        <div>
          <label for="amount">{{ 'USAGE_TRACKER.AMOUNT' | translate }}</label>
          <input type="number" id="amount" [(ngModel)]="amount" name="amount" required>
        </div>
        <button type="submit">{{ 'USAGE_TRACKER.RECORD' | translate }}</button>
      </form>
      <div class="usage-stats">
        <h3>{{ 'USAGE_TRACKER.STATS' | translate }}</h3>
        <p>{{ 'USAGE_TRACKER.AVERAGE_DAILY' | translate }}: {{ averageDailyUse }} g</p>
        <p>{{ 'USAGE_TRACKER.TOTAL_MONTHLY' | translate }}: {{ totalMonthlyUse }} g</p>
      </div>
    </div>
  `
})
export class UsageTrackerComponent implements OnInit {
  strains: Strain[] = [];
  selectedStrainId: number = 0;
  amount: number = 0;
  averageDailyUse: number = 0;
  totalMonthlyUse: number = 0;

  constructor(
    private usageService: UsageService,
    private strainService: StrainService
  ) {}

  ngOnInit() {
    this.loadStrains();
    this.loadUsageStats();
  }

  loadStrains() {
    this.strainService.getStrains().subscribe(strains => this.strains = strains,
      error => console.error('Error loading strains', error)
    );
  }

  loadUsageStats() {
    this.usageService.getUsageStats().subscribe(
      stats => {
        this.averageDailyUse = stats.averageDailyUse;
        this.totalMonthlyUse = stats.totalMonthlyUse;
      },
      error => console.error('Error loading usage stats', error)
    );
  }

  onSubmit() {
    if (this.selectedStrainId && this.amount) {
      this.usageService.recordUsage(this.selectedStrainId, this.amount).subscribe(
        () => {
          this.loadUsageStats();
          this.amount = 0;
        },
        error => console.error('Error recording usage', error)
      );
    }
  }
}