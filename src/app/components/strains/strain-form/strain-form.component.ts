import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StrainService } from '../../../services/strain.service';
import { Strain } from '../../../models/strain.model';

@Component({
  selector: 'app-strain-form',
  template: `
    <div class="strain-form">
      <h2>{{ isEditMode ? ('STRAIN_FORM.EDIT_TITLE' | translate) : ('STRAIN_FORM.ADD_TITLE' | translate) }}</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="name">{{ 'STRAIN_FORM.NAME' | translate }}</label>
          <input type="text" id="name" [(ngModel)]="strain.name" name="name" required>
        </div>
        <div>
          <label for="type">{{ 'STRAIN_FORM.TYPE' | translate }}</label>
          <select id="type" [(ngModel)]="strain.type" name="type" required>
            <option value="Indica">Indica</option>
            <option value="Sativa">Sativa</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label for="thcContent">{{ 'STRAIN_FORM.THC_CONTENT' | translate }}</label>
          <input type="number" id="thcContent" [(ngModel)]="strain.thcContent" name="thcContent" required>
        </div>
        <div>
          <label for="cbdContent">{{ 'STRAIN_FORM.CBD_CONTENT' | translate }}</label>
          <input type="number" id="cbdContent" [(ngModel)]="strain.cbdContent" name="cbdContent" required>
        </div>
        <div>
          <label for="quantity">{{ 'STRAIN_FORM.QUANTITY' | translate }}</label>
          <input type="number" id="quantity" [(ngModel)]="strain.quantity" name="quantity" required>
        </div>
        <div>
          <label for="personalScore">{{ 'STRAIN_FORM.PERSONAL_SCORE' | translate }}</label>
          <input type="number" id="personalScore" [(ngModel)]="strain.personalScore" name="personalScore" min="1" max="10" required>
        </div>
        <div>
          <label for="personalNotes">{{ 'STRAIN_FORM.PERSONAL_NOTES' | translate }}</label>
          <textarea id="personalNotes" [(ngModel)]="strain.personalNotes" name="personalNotes"></textarea>
        </div>
        <button type="submit">{{ isEditMode ? ('STRAIN_FORM.UPDATE' | translate) : ('STRAIN_FORM.ADD' | translate) }}</button>
      </form>
    </div>
  `
})
export class StrainFormComponent implements OnInit {
  strain: Strain = {
    id: 0,
    name: '',
    type: '',
    thcContent: 0,
    cbdContent: 0,
    quantity: 0,
    personalScore: 0,
    personalNotes: ''
  };
  isEditMode: boolean = false;

  constructor(
    private strainService: StrainService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadStrain(+id);
    }
  }

  loadStrain(id: number) {
    this.strainService.getStrain(id).subscribe(
      strain => this.strain = strain,
      error => console.error('Error loading strain', error)
    );
  }

  onSubmit() {
    if (this.isEditMode) {
      this.strainService.updateStrain(this.strain).subscribe(
        () => this.router.navigate(['/strains']),
        error => console.error('Error updating strain', error)
      );
    } else {
      this.strainService.addStrain(this.strain).subscribe(
        () => this.router.navigate(['/strains']),
        error => console.error('Error adding strain', error)
      );
    }
  }
}