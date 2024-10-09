import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StrainService } from '../../../services/strain.service';
import { Strain } from '../../../models/strain.model';

@Component({
  selector: 'app-strain-list',
  template: `
    <div class="strain-list">
      <h2>{{ 'STRAIN_LIST.TITLE' | translate }}</h2>
      <button (click)="addNewStrain()">{{ 'STRAIN_LIST.ADD_NEW' | translate }}</button>
      <table>
        <thead>
          <tr>
            <th>{{ 'STRAIN_LIST.NAME' | translate }}</th>
            <th>{{ 'STRAIN_LIST.TYPE' | translate }}</th>
            <th>{{ 'STRAIN_LIST.THC' | translate }}</th>
            <th>{{ 'STRAIN_LIST.CBD' | translate }}</th>
            <th>{{ 'STRAIN_LIST.QUANTITY' | translate }}</th>
            <th>{{ 'STRAIN_LIST.SCORE' | translate }}</th>
            <th>{{ 'STRAIN_LIST.ACTIONS' | translate }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let strain of strains">
            <td>{{ strain.name }}</td>
            <td>{{ strain.type }}</td>
            <td>{{ strain.thcContent }}%</td>
            <td>{{ strain.cbdContent }}%</td>
            <td>{{ strain.quantity }}g</td>
            <td>{{ strain.personalScore }}/10</td>
            <td>
              <button (click)="editStrain(strain.id)">{{ 'STRAIN_LIST.EDIT' | translate }}</button>
              <button (click)="deleteStrain(strain.id)">{{ 'STRAIN_LIST.DELETE' | translate }}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class StrainListComponent implements OnInit {
  strains: Strain[] = [];

  constructor(
    private strainService: StrainService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStrains();
  }

  loadStrains() {
    this.strainService.getStrains().subscribe(
      strains => this.strains = strains,
      error => console.error('Error loading strains', error)
    );
  }

  addNewStrain() {
    this.router.navigate(['/strains/new']);
  }

  editStrain(id: number) {
    this.router.navigate(['/strains/edit', id]);
  }

  deleteStrain(id: number) {
    if (confirm('Are you sure you want to delete this strain?')) {
      this.strainService.deleteStrain(id).subscribe(
        () => this.loadStrains(),
        error => console.error('Error deleting strain', error)
      );
    }
  }
}